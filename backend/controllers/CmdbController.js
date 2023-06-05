const Cmdb = require('../models/Cmdb')

// helpers
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class CmdbController {
  // create a cmdb
  static async create(req, res) {
    const name = req.body.name
    const description = req.body.description
   
    // console.log(req.body)
  
    // return

    // validations
    if (!name) {
      res.status(422).json({ message: 'O name é obrigatório!' })
      return
    }

    if (!description) {
      res.status(422).json({ message: 'A description é obrigatória!' })
      return
    }


    // get user
    const token = getToken(req)
    const user = await getUserByToken(token)

    // create Cmdb
    const cmdb = new Cmdb({
      name: name,
      description: description,

    })

    
    try {
      const newCmdb = await cmdb.save()

      res.status(201).json({
        message: 'Cmdb cadastrado com sucesso!',
        newCmdb: newCmdb,
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // get all registered cmdb
  static async getAll(req, res) {
  

    const cmdb = await Cmdb.find().sort('-createdAt')

    res.status(200).json({
      cmdb: cmdb,
    })
  }

  // get all user cmdb
  static async getAllUserCmdb(req, res) {
    // get user
    const token = getToken(req)
    const user = await getUserByToken(token)

    const cmdb = await Cmdb.find({ 'user._id': user._id })

    res.status(200).json({
      cmdb,
    })
  }

  // get all user adoptions
  static async getAllUserAdoptions(req, res) {
    // get user
    const token = getToken(req)
    const user = await getUserByToken(token)

    const cmdb = await Cmdb.find({ 'adopter._id': user._id })

    res.status(200).json({
      cmdb,
    })
  }

  // get a specific cmdb
  static async getCmdbById(req, res) {
    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // check if cmdb exists
    const cmdb = await Cmdb.findOne({ _id: id })

    if (!cmdb) {
      res.status(404).json({ message: 'Cmdb não encontrado!' })
      return
    }

    res.status(200).json({
      cmdb: cmdb,
    })
  }

  // remove a cmdb
  static async removeCmdbById(req, res) {
    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // check if cmdb exists
    const cmdb = await Cmdb.findOne({ _id: id })

    if (!cmdb) {
      res.status(404).json({ message: 'Cmdb não encontrado!' })
      return
    }

    // check if user registered this cmdb
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (cmdb.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    await Cmdb.findByIdAndRemove(id)

    res.status(200).json({ message: 'Cmdb removido com sucesso!' })
  }

  // update a cmdb
  static async updateCmdb(req, res) {
    const name = req.params.name
    const description = req.body.description
   

    const updateData = {}

    // check if cmdb exists
    const cmdb = await Cmdb.findOne({ _id: id })

    if (!cmdb) {
      res.status(404).json({ message: 'Cmdb não encontrado!' })
      return
    }

    // check if user registered this cmdb
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (cmdb.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    } else {
      updateData.name = name
    }

    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatória!' })
      return
    } else {
      updateData.age = age
    }

    if (!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!' })
      return
    } else {
      updateData.weight = weight
    }

    if (!color) {
      res.status(422).json({ message: 'A cor é obrigatória!' })
      return
    } else {
      updateData.color = color
    }

    if (!images) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    } else {
      updateData.images = []
      images.map((image) => {
        updateData.images.push(image.filename)
      })
    }

    if (!available) {
      res.status(422).json({ message: 'O status é obrigatório!' })
      return
    } else {
      updateData.available = available
    }

    updateData.description = description

    await Cmdb.findByIdAndUpdate(id, updateData)

    res.status(200).json({ cmdb: cmdb, message: 'Cmdb atualizado com sucesso!' })
  }

  // schedule a visit
  static async schedule(req, res) {
    const id = req.params.id

    // check if cmdb exists
    const cmdb = await Cmdb.findOne({ _id: id })

    // check if user owns this cmdb
    const token = getToken(req)
    const user = await getUserByToken(token)

    console.log(cmdb)

    if (cmdb.user._id.equals(user._id)) {
      res.status(422).json({
        message: 'Você não pode agendar uma visita com seu próprio Cmdb!',
      })
      return
    }

    // check if user has already adopted this cmdb
    if (cmdb.adopter) {
      if (cmdb.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: 'Você já agendou uma visita para este Cmdb!',
        })
        return
      }
    }

    // add user to cmdb
    cmdb.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    }

    console.log(cmdb)

    await Cmdb.findByIdAndUpdate(cmdb._id, cmdb)

    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${cmdb.user.name} no telefone: ${cmdb.user.phone}`,
    })
  }

  // conclude a cmdb adoption
  static async concludeAdoption(req, res) {
    const id = req.params.id

    // check if cmdb exists
    const cmdb = await Cmdb.findOne({ _id: id })

    cmdb.available = false

    await Cmdb.findByIdAndUpdate(cmdb._id, cmdb)

    res.status(200).json({
      cmdb: cmdb,
      message: `Parabéns! O ciclo de adoção foi finalizado com sucesso!`,
    })
  }
}
