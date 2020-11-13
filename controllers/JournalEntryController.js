const {JournalEntry, User} = require('../db/models');


const GetJournalEntrys = async (req, res) => {
    try {
        const { page, limit } = req.query
        const offset =
        page === '1' ? 0 : Math.floor(parseInt(page) * parseInt(limit))
        const posts = await TravelLog.find()
            .limit(parseInt(limit))
            .skip(offset)
            .sort({ popularity_rating: 'desc' })
        res.send(posts)
    } catch (error) {
        throw error
    }
  }

  const CreateJournalEntry = async (req, res) => {
    try {
        console.log(req.body)
        const newEntry = new JournalEntry({ ...req.body})
        newEntry.save()
        await User.updateOne({_id: req.params.user_id},
            {$push: {entries: newEntry}}
        )
      res.send(newEntry)
    } catch (error) {
      throw error
    }
  }

  module.exports = {
      GetJournalEntrys,
      CreateJournalEntry
  }