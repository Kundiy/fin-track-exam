export type Goal = {
    id: string;
    name: string;
    goalAmount: string;
    goalTargetDate: string;
    savedAmount: string;
};

export type GoalsState = {
    goals: Goal[];
    currentGoal: Goal | null;
    error?: string;
};

export type RequestAddGoal = Omit<Goal, 'id' | 'savedAmount'>;

export type GoalFormErrors = {
    [key in keyof RequestAddGoal]?: string;
};
