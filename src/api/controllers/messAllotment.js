// -> Preference Order
// VEG -GIRLS
// NON VEG - GIRLS
// VEG - BOYS
// NON -VEG BOYS

// So everytime we do we have to update the Mess Availability and send a mail/mailing all at once ??

const db = require("../../../db");
const { messUser, messAvailability } = require("../models/mess");
const { preferences } = require("../models/prefernces");

// useful parameters
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
const day = date.getDate();
if (day >= 25) {
  if (month == 12) {
    month = 1;
    year += 1;
  } else {
    month += 1;
  }
}

const createMessUser = async (id, gen, rollno) => {
  try {
    const user = await messUser.findOne({
      where: { studentId: rollno, year: year, month: month },
    });
    if (user == null) {
      const availability = await messAvailability.findOne({
        where: { messId: id },
      });
      if (gen == 0 && availability.boysCount >= availability.boysCapacity) {
        return false;
      } else if (
        gen == 1 &&
        availability.girlsCount >= availability.girlsCapacity
      ) {
        return false;
      }
      const data = await messUser.create({
        messId: id,
        studentId: rollno,
        year: year,
        month: month,
      });
      if (data) {
        if (gen == 0) {
          let messAvailablityData = await messAvailability.update(
            {
              boysCount: availability.boysCount + 1,
            },
            { where: { messId: id } }
          );
        } else if (gen == 1) {
          let messAvailablityData = await messAvailability.update(
            {
              girlsCount: availability.girlsCount + 1,
            },
            { where: { messId: id } }
          );
        }
      }

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Unable to Create Mess User for ${id}`);
    return false;
  }
};

//create messUser will take care of Availability Updation.

const allotmentOrder = async (gender, isVeggie) => {
  const STUDENT_PREF = await preferences.findAll(
    { where: { gen: gender, isVeg: isVeggie } },
    { order: ["createdAt", "ASC"] }
  );

  for (let i = 0; i < STUDENT_PREF.length; i++) {
    const element = STUDENT_PREF[i];
    // console.log(element);
    const { pref1, pref2, pref3 } = element.dataValues;
    // console.log(rollno, pref1, pref2, pref3);
    const rollno = element.dataValues.rollno.toLowerCase();
    if (!createMessUser(pref1, gender, rollno)) {
      if (!createMessUser(pref2, gender, rollno)) {
        if (!createMessUser(pref3, gender, rollno)) {
          return false;
        }
      }
    }
  }
  return true;
};

exports.messAllotment = async (req, res) => {
  try {
    allotmentOrder(true, true);
    allotmentOrder(true, false);
    allotmentOrder(false, true);
    allotmentOrder(false, false);

    res.status(200).json({
      message: "Allotment successful",
    });
  } catch (error) {
    res.status(401).json({
      err: "Problem in allotment",
    });
  }
};
