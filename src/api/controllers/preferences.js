const { preferences } = require("../models/prefernces");

exports.getAllPreferences = async (req, res) => {
  try {
    const data = await preferences.findAll();
    res.status(200).json({
      message: "successfully fetched preferences",
      data: data,
    });
  } catch (err) {
    res.status(401).json({
      err: "Unable to fetch Preferences",
    });
  }
};

exports.getPreferencesById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await preferences.findAll({
      where: { rollno: id },
    });
    if (data) {
      res.status(200).json({
        message: "successfully fetched preferences by ID",
        data: data,
      });
    } else {
      res.status(200).json({
        err: `No Data Available for this ID${id}`,
      });
    }
  } catch (err) {
    res.status(401).json({
      err: `Unable to get Preferences for ${id}`,
    });
  }
};

exports.createPreference = async (req, res) => {
  try {
    const { id, pref1, pref2, pref3, isVeg, gen } = req.body;
    const data = await preferences.create({
      rollno: id,
      pref1: pref1,
      pref2: pref2,
      pref3: pref3,
      isVeg: isVeg,
      gen: gen,
      isAlloted: false,
    });
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    res.status(401).json({
      err: `Unable to create Preferences`,
    });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { pref1, pref2, pref3, isVeg, gen } = req.body;
    const id = req.params.id;

    const data = await preferences.update(
      {
        pref1: pref1,
        pref2: pref2,
        pref3: pref3,
        isVeg: isVeg,
        gen: gen,
        isAlloted: false,
      },
      {
        where: { rollno: id },
      }
    );

    if (data[0]) {
      res.status(200).json({
        data: data,
      });
    } else {
      res.status(401).json({
        err: `Unable to get Preferences with id :${id}`,
      });
    }
  } catch (err) {
    res.status(401).json({
      err: `Unable to update Preferences`,
    });
  }
};

exports.deletePreferences = async (req, res) => {
  try {
    const result = await preferences.destroy({ where: { id: true } });
    res.status(200).json({
      message: "Successfully Deleted all the records",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: `Unable to delete all Records in Preferences Table`,
    });
  }
};
