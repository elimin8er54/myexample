const Landlord = require('../models/landlord.model.ts');

// Create and Save a new Landlord
exports.create = (req: any, res: any) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Save Landlord in the database
  Landlord.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Landlord.',
      });
    } else res.send(data);
  });
};

// Retrieve all Landlord from the database.

exports.findAll = (req: any, res: any) => {
  Landlord.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving landlords.',
      });
    } else res.send(data);
  });
};

// Find a single Landlord with a landlordId
exports.findOne = (req: any, res: any) => {
  Landlord.findById(req.params.landlordId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Landlord with id ${req.params.landlordId}.`,
        });
      } else {
        res.status(500).send({
          message:
            `Error retrieving Landlord  with id ${req.params.landlordId}`,
        });
      }
    } else res.send(data);
  });
};

// Update a Landlord identified by the landlordId in the request
exports.update = (req: any, res: any) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }


  Landlord.updateById(
    req.params.landlordId,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Landlord with id ${req.params.landlordId}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating Landlord with id ${req.params.landlordId}`,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Landlord with the specified landlordId in the request
exports.delete = (req: any, res: any) => {
  Landlord.remove(req.params.landlordId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Landlord with id ${req.params.landlordId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Landlord with id ${req.params.landlordId}`,
        });
      }
    } else res.send({ message: 'Landlord was deleted successfully!' });
  });
};

// Delete all Landlord from the database.
exports.deleteAll = (req: any, res: any) => {
  Landlord.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all customers.',
      });
    } else res.send({ message: 'All Customers were deleted successfully!' });
  });
};