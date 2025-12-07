import * as menuServices from "../services/menuServices.js";

const getAll = async (req, res, next) => {
  try {
    const result = await menuServices.getAllMenu();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default getAll;
