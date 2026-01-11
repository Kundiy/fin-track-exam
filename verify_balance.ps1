$baseUrl = "http://localhost:8080"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$email = "testuser_$timestamp@example.com"
$password = "Password123!"

# 1. Register
echo "Registering user: $email"
$registerBody = @{
    name = "Test"
    lastname = "User"
    email = $email
    password = $password
    repeatPassword = $password
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

# 3. Get Categories to find an Income category
echo "Fetching categories..."
try {
    $categories = Invoke-RestMethod -Uri "$baseUrl/close/api/v1/categories" -Method Get -Headers $headers
    # Income Type ID from constants/queries: 00000001-0000-0000-0000-000000000001
    $incomeCategory = $categories | Where-Object { $_.categoryTypeId -eq "00000001-0000-0000-0000-000000000001" } | Select-Object -First 1
    
    if (-not $incomeCategory) {
        # Create one if missing "Salary"
        echo "No income category found, creating 'Salary'..."
        $catBody = @{
            name = "Salary"
            categoryTypeId = "00000001-0000-0000-0000-000000000001"
        } | ConvertTo-Json
        
        try {
            $newCat = Invoke-RestMethod -Uri "$baseUrl/close/api/v1/categories" -Method Post -Body $catBody -Headers $headers -ContentType "application/json"
            $categoryId = $newCat.id
            echo "Created Category: Salary ($categoryId)"
        } catch {
            echo "Failed to create category: $_"
            exit
        }
    } else {
        $categoryId = $incomeCategory.id
        echo "Using Category: $($incomeCategory.name) ($categoryId)"
    }
} catch {
    echo "Failed to get/find categories: $_"
    exit
}

# 4. Add Transaction
echo "Adding Transaction: 12000..."
$transactionBody = @{
    amount = 12000
    description = "Test Balance 12000"
    categoryId = $categoryId
    when = (Get-Date).ToString("yyyy-MM-dd")
} | ConvertTo-Json

try {
    $transResponse = Invoke-RestMethod -Uri "$baseUrl/close/api/v1/transactions" -Method Post -Body $transactionBody -Headers $headers -ContentType "application/json"
    echo "Transaction Added."
} catch {
    echo "Failed to add transaction: $_"
    exit
}

# 5. Get Balance
echo "Verifying Balance..."
try {
    $balanceResponse = Invoke-RestMethod -Uri "$baseUrl/close/api/v1/transactions/balance" -Method Get -Headers $headers
    echo "Current Balance: $($balanceResponse.amount)"
    
    if ($balanceResponse.amount -eq 12000) {
        echo "SUCCESS: Balance matches 12000."
    } else {
        echo "FAILURE: Balance is $($balanceResponse.amount), expected 12000."
    }
} catch {
    echo "Failed to get balance: $_"
    exit
}
