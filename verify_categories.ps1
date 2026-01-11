$baseUrl = "http://localhost:8080"
$email = "testuser_$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
$password = "password123"

# 1. Register
echo "Registering user: $email"
$registerBody = @{
    email = $email
    password = $password
    name = "Test"
    lastname = "User"
} | ConvertTo-Json

try {
    $regResponse = Invoke-RestMethod -Uri "$baseUrl/open/api/v1/register" -Method Post -Body $registerBody -ContentType "application/json"
} catch {
    echo "Registration failed: $_"
    exit
}

# 2. Login
echo "Logging in..."
$loginBody = @{
    email = $email
    password = $password
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/open/api/v1/login" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.token
} catch {
    echo "Login failed: $_"
    exit
}

$headers = @{
    Authorization = "Bearer $token"
}

# 3. Add Category
echo "Adding Category 'TestCat'..."
$catBody = @{
    name = "TestCat"
    categoryTypeId = "00000001-0000-0000-0000-000000000001" # Income
} | ConvertTo-Json

try {
    $newCat = Invoke-RestMethod -Uri "$baseUrl/close/api/v1/categories" -Method Post -Body $catBody -Headers $headers -ContentType "application/json"
    $categoryId = $newCat.id
    echo "Created Category: $($newCat.name) ($categoryId)"
} catch {
    echo "Failed to create category: $_"
    exit
}

# 4. Verify Category Exists
echo "Fetching categories to verify..."
$categories = Invoke-RestMethod -Uri "$baseUrl/close/api/v1/categories?categoryTypeId=00000001-0000-0000-0000-000000000001" -Method Get -Headers $headers
$found = $categories | Where-Object { $_.id -eq $categoryId }

if ($found) {
    echo "Category found."
} else {
    echo "Category NOT found."
    exit
}

# 4.5 Add Transaction to this category to test FK
echo "Adding transaction to category..."
$tBody = @{
    amount = 500
    description = "Test FK"
    categoryId = $categoryId
    when = (Get-Date).ToString("yyyy-MM-dd")
} | ConvertTo-Json

try {
    $tr = Invoke-RestMethod -Uri "$baseUrl/close/api/v1/transactions" -Method Post -Body $tBody -Headers $headers -ContentType "application/json"
    echo "Transaction added."
} catch {
    echo "Failed to add transaction for FK test: $_"
    # Proceeding anyway to see if delete fails (it might fail to add if I broke transaction adding previously, but I think I fixed it)
}

# 5. Delete Category
echo "Deleting Category (with transaction)..."
try {
    $delResponse = Invoke-RestMethod -Uri "$baseUrl/close/api/v1/categories/$categoryId" -Method Delete -Headers $headers
    if ($delResponse.id -eq $categoryId) {
        echo "Delete returned correct ID."
    } else {
        echo "Delete returned unexpected: $($delResponse | ConvertTo-Json)"
    }
} catch {
    echo "Failed to delete: $_"
    exit
}

# 6. Verify Deletion
echo "Fetching categories to verify deletion..."
$categoriesAfter = Invoke-RestMethod -Uri "$baseUrl/close/api/v1/categories?categoryTypeId=00000001-0000-0000-0000-000000000001" -Method Get -Headers $headers
$foundAfter = $categoriesAfter | Where-Object { $_.id -eq $categoryId }

if (-not $foundAfter) {
    echo "SUCCESS: Category successfully deleted."
} else {
    echo "FAILURE: Category still exists."
}
