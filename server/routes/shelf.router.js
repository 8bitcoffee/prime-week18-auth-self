const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let queryText = `
    SELECT 
      item.id AS id, 
      item.description AS description,
      item.image_url AS image_url,
      item.user_id AS user_id,
      "user"."username" AS username
    FROM "item"
    JOIN "user" ON "user"."id" = item.user_id;`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  if (req.isAuthenticated()){
    let queryText = `
      INSERT INTO "item" ("description", "image_url", "user_id")
      VALUES ($1, $2, $3)
    `;
    pool.query(queryText, [req.body.description, req.body.image_url, req.user.id])
      .then((response)=>{
        res.sendStatus(201)
      })
      .catch((error) => {
        console.error("Error in POST '/api/shelf", error);
      })
  }
  else {
    res.sendStatus(401);
  }
});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
  if (req.isAuthenticated()){
    let queryText = `
      SELECT item.user_id from "item"
      WHERE "item"."id" = $1;
    `;
    pool.query(queryText, [req.params.id])
      .then((response) => {
        if (response.rows[0].id == req.user.id){
          let queryText = `
            DELETE FROM "item"
            WHERE "id" = $1;
          `;
          pool.query(queryText, [req.params.id])
            .then((response)=>{
              res.sendStatus(201)
            })
            .catch((error) => {
              console.error("Error in DELETE '/api/shelf/:id", error);
            })
          ;
        }
        else {
          res.sendStatus(401)
        }
      })
      .catch((error) => {
        console.error("Error in DELETE '/api/shelf/:id", error);
      })
    ;
  }
});

module.exports = router;
