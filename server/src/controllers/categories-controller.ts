import {QUERIES} from "../datasources/queries";
import * as db from '../db';
import {Response, Request} from "express";

export const getCategoryTypes = async (response: Response) => {
    try {
        const result = await db.query(QUERIES.SELECT_CATEGORY_TYPES);
        return response.status(200).json(result.rows);
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const appendSimpleCategory = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const {name, categoryTypeId} = request.body;
        const values = [userId, categoryTypeId, name];
        const result = await db.query(QUERIES.APPEND_SIMPLE_CATEGORY, values);
        return response.status(201).json(result.rows[0]);
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const getCategoriesByCategoryType = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const {categoryTypeId, balance} = request.query;
        const values = [userId, categoryTypeId];
        const dbQuery = !!balance ? QUERIES.SELECT_CATEGORY_BY_CATEGORY_TYPE_WITH_BALANCE : QUERIES.SELECT_CATEGORY_BY_CATEGORY_TYPE;
        const result = await db.query(dbQuery, values);
        return response.status(200).json(!!balance ? result.rows[0] : result.rows);
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const getCategoryById = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query(QUERIES.SELECT_CATEGORY_BY_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const updateCategoryById = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const id = request.params.id;
        const {name} = request.body;
        const values = [id, userId, name];
        const result = await db.query(QUERIES.UPDATE_CATEGORY_BY_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const deleteCategoryById = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query(QUERIES.DELETE_CATEGORY_BY_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const selectBalanceByUserId = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const values = [userId];
        const result = await db.query(QUERIES.SELECT_BALANCE_BY_USER_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {amount: 0});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}
