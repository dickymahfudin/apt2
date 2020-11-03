const { nojsUserModel } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const id = req.params.id;
  const nojs = req.body.nojs;
  const site = req.body.site;
  const provinsi = req.body.provinsi;
  const lc = req.body.lc;
  const mitra = req.body.mitra;
  const ip = req.body.ip;
  const latitutde = req.body.latitutde;
  const longitude = req.body.longitude;
  const id_lvd_vsat = req.body.id_lvd_vsat;
  const id_ping = req.body.id_ping;
  const id_batt_volt = req.body.id_batt_volt;
  const id_vsat_curr = req.body.id_vsat_curr;
  const id_bts_curr = req.body.id_bts_curr;

  const schema = {
    nojs: "string|empty:false",
    site: "string|empty:false",
    lc: "string|empty:false",
    mitra: "string|empty:false",
    ip: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const nojsUser = await nojsUserModel.findByPk(id);
  if (!nojsUser) {
    return res.status(404).json({
      status: "error",
      message: "Nojs not found",
    });
  }

  await nojsUser.update({
    nojs,
    site,
    provinsi,
    lc,
    mitra,
    ip,
    latitutde,
    longitude,
    id_lvd_vsat,
    id_ping,
    id_batt_volt,
    id_vsat_curr,
    id_bts_curr,
  });

  return res.json({
    status: "success",
    data: {
      id: nojsUser.id,
      nojs,
      site,
      provinsi,
      lc,
      mitra,
      ip,
      latitutde,
      longitude,
      id_lvd_vsat,
      id_ping,
      id_batt_volt,
      id_vsat_curr,
      id_bts_curr,
    },
  });
};