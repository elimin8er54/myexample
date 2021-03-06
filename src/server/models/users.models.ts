import { builtinModules } from "module";

const bcrypt = require("bcryptjs");
const sql = require("./db");
const auth = require("../config/auth.config");
const jwt = require("jsonwebtoken");


module.exports = {
  signin: (newUser: any, result: any) => {
    sql.query(
      "SELECT * FROM apiuser WHERE apiuser_username = ? ",
      [newUser.username],
      (err: any, res: string | any[]) => {
        if (err) {

          result(err, null);
          return;
        }

        if (
          res.length &&
          bcrypt.compareSync(newUser.password, res[0].apiuser_password)
        ) {

          const token = jwt.sign({ user_id: res[0].apiuser_id }, auth.secret, {
            expiresIn: 60 * 100,
          });

          result(null, { token: token, success: true });
        } else {
          result(null, { success: false });
        }
      }
    );
  },

  signup: (newUser: any, result: any) => {

    sql.query(
      "SELECT * FROM apiuser WHERE apiuser_username = ?",
      [newUser.username],
      (err: any, res: string | any[]) => {
        if (err) {

          result(err, null);
          return;
        }

        if (res.length) {
          result(null, { success: false });
        } else {
          sql.query(
            "INSERT INTO apiuser (apiuser_username,apiuser_password) VALUES (?,?)",
            [newUser.username, bcrypt.hashSync(newUser.password, 8)],
            (err: any, res2: { insertId: any; }) => {
              if (err) {
                console.log(err);
                result(err, null);
                return;
              } else {
                const token = jwt.sign({ user_id: res2.insertId }, auth.secret, {
                  expiresIn: 60 * 60,
                });

                result(null, { token: token, success: true });
              }
            }
          );
        }
      }
    );
  }

}

