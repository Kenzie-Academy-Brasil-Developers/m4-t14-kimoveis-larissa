import { Request, Response } from "express";
import {
  IRealEstate,
  IRealEstateList,
  IRealEstateResponse,
} from "../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";
import { listRealEstateService } from "../services/realEstate/listRealEstate.service";

const createRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstateData: IRealEstate = request.body;

  const newRealEstate: IRealEstateResponse = await createRealEstateService(
    realEstateData
  );

  return response.status(201).json(newRealEstate);
};

const listRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstateList: IRealEstateList = await listRealEstateService();

  return response.json(realEstateList);
};

export { createRealEstateController, listRealEstateController };
