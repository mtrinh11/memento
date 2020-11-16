const {JournalEntry, User} = require('../db/models');


const GetJournalEntrys = async (req, res) => {
    try {
        // const { page, limit } = req.query
        // const offset =
        // page === '1' ? 0 : Math.floor(parseInt(page) * parseInt(limit))
        // const posts = await JournalEntry.find()
        //     .limit(parseInt(limit))
        //     .skip(offset)
        //     .sort({ popularity_rating: 'desc' })

        const entrys = await User.findById(req.params.user_id)
        res.send(entrys.entries)
    } catch (error) {
        throw error
    }
  }

  const GetOneEntry = async(req, res) => {
    try {
      const post = await JournalEntry.findById(req.params.journeyentry_id)
      res.send(post)
    } catch (error) {
      throw error
    }
  }

  const CreateJournalEntry = async (req, res) => {
    try {
        const newEntry = new JournalEntry({ ...req.body})
        if (req.body.date != undefined) {
          console.log(newEntry)
          newEntry.save()
          await User.updateOne({_id: req.params.user_id},
            {$push: {entries: newEntry}}
          )
        }
      res.send(newEntry)
    } catch (error) {
      throw error
    }
  }

  const DeleteEntry = async(req, res) => {
    try {
      await JournalEntry.deleteOne({_id: req.params.journalentry_id})
      await User.findByIdAndUpdate(
        req.params.user_id,
        { $pull:{entries: req.params.journalentry_id}},
        { new: true, useFindAndModify: false }
      )
      res.send({msg:'success'})
    } catch (error) {
      throw error
    }
  }

  const UpdateEntry = async(req,res) => {
    try {
      await JournalEntry.findByIdAndUpdate(
        req.params.post_id,
        {...req.body},
        { new: true, useFindAndModify: false },
      )
      res.send({msg: 'success'})
    } catch (error) {
      throw error
    }
  }

  module.exports = {
      GetJournalEntrys,
      CreateJournalEntry,
      GetOneEntry,
      DeleteEntry,
      UpdateEntry
  }