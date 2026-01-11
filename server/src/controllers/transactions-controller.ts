import { QUERIES } from "../datasources/queries";
import * as db from '../db';
import { Response, Request } from "express";


export const selectTransactionsByUserId = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as any).user;
        const values = [userId];
        const result = await db.query(QUERIES.SELECT_TRANSACTIONS_BY_USER_ID, values);
        return response.status(200).json(result.rows);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export const selectBalanceByUserId = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as any).user;
        const values = [userId];
        const result = await db.query(QUERIES.SELECT_BALANCE_BY_USER_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : { amount: 0 });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export const appendTransaction = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as any).user;
        const { categoryId, when, amount } = request.body;
        const values = [userId, categoryId, when, amount];
        const result = await db.query(QUERIES.APPEND_TRANSACTION, values);
        return response.status(201).json(result.rows[0]);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export const updateTransactionById = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as any).user;
        const id = request.params.id;
        const { when, amount } = request.body;
        const values = [id, userId, when, amount];
        const result = await db.query(QUERIES.UPDATE_TRANSACTION, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export const deleteTransactionById = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as any).user;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query(QUERIES.DELETE_TRANSACTION, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export const getTransactionById = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as any).user;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query(QUERIES.SELECT_TRANSACTION_BY_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}
