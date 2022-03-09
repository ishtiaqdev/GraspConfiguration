import Grasp from '../models/grasp.model'
import errorHandler from '../helpers/dbErrorHandler'
import parseDataUrl from 'parse-data-url';


const create = async (req, res) => {

  const graspData = new Grasp(req.body)
  const parsed = parseDataUrl(req.body.graspImage);

  graspData.graspImage.data = parsed.data;
  graspData.graspImage.contentType = parsed.contentType;

  try {
    await graspData.save()
    return res.status(200).json({
      message: "Successfully saved grasp configuration!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let graspData = await Grasp.find().select('name fingerWidth fingerHeight fingerStroke graspImage created')
    res.json(graspData)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  list,
}
