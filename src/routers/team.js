const express = require("express");
const { authMember } = require("../middleware/auth");
const { jwtAuthMiddleware } = require("../middleware");
const User = require("../models/user");
const Task = require("../models/task");
const Team = require("../models/team");
const Project = require("../models/project");

const router = new express.Router();
//
//              POST ROUTES
//
//  Kreiranje tima
router.post("/teams", jwtAuthMiddleware, async (req, res) => {
  try {
    await req.user.populate("teams").execPopulate();
    if (req.user.teams.length) {
      req.user.teams.forEach((existingTeam) => {
        if (existingTeam.name === req.body.name) {
          throw new Error({ error: "Ime je zauzeto." });
        }
      });
    }
    const team = new Team({
      ...req.body,
      leader: req.user._id,
    });
    team.members.push({ member: { ...req.user } });
    await team.save();
    req.user.teams.push(team);
    await req.user.save();
    res.send(team);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
//
//              GET ROUTES
//
//  Get sve svoje timove
router.get("/teams/me", jwtAuthMiddleware, async (req, res) => {
  try {
    await req.user.populate("teams").execPopulate();
    res.send(req.user.teams);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
// Get timove gde je korisnik leader
router.get("/teams/me/leader", jwtAuthMiddleware, async (req, res) => {
  try {
    await req.user.populate("teams").execPopulate();
    const teams = req.user.teams.filter((item) =>
      item.leader.equals(req.user._id)
    );
    res.send(teams);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
//  Info odredjenog tima
router.get("/teams/:teamId", jwtAuthMiddleware, async (req, res) => {
  try {
    await req.user.populate("teams").execPopulate();
    if (req.user.teams.length) {
      req.user.teams.forEach((team) => {
        if (team._id === req.params.teamId) {
          //
          //  EVENTUALNO POPULATE STA GOD
          //
          res.send(team);
        }
      });
    }
    res.status(401).send();
  } catch (e) {
    res.status(400).send(e);
  }
});
//
//              PATCH ROUTES
//
//  Updateovanje tima
router.patch("/teams/me", jwtAuthMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedToUpdate = ["name", "email", "password", "age"];
  const isValidUpdate = updates.every((update) =>
    allowedToUpdate.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(404).send();
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send();
  }
});
//
//              DELETE ROUTES
//
//  Brisanje tima
router.delete("/teams/:teamId", jwtAuthMiddleware, async (req, res) => {});
//
//
//
module.exports = router;
