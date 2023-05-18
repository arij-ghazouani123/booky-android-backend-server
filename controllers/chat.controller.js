import Message from '../modals/message.js'
import Conversation from '../modals/conversation.js'

export async function getAllConversations  (req, res)  {
    res.send({conversations: await Conversation.find()})
    
} 

export async function getAllMessages  (req, res) {
    res.send({messages: await Message.find()})
}

export async function getMyConversations (req, res) {
    res.send({ conversations: await Conversation.find({ "sender": req.body.sender }).populate("sender receiver") })
}



export async function getMyMessages(req, res) {
    res.send({
        messages: await Message.find(
            {
                $or: [{ 'senderConversation': req.body.conversation }, { 'receiverConversation': req.body.conversation }]
            }
        ).populate("senderConversation receiverConversation")
    })
}

export async function creerNouvelleConversation(req, res) {
    const { sender, receiver } = req.body

    let senderConversation = await Conversation.findOne({ "sender": sender, "receiver": receiver })
    if (!senderConversation) {
        senderConversation = new Conversation()
        senderConversation.sender = sender
        senderConversation.receiver = receiver
    }
    senderConversation.lastMessage = "conversation vide"
    senderConversation.lastMessageDate = Date()
    senderConversation.save()

    res.status(200).send({ message: "success" })
}

export async function envoyerMessage(req, res) {
    const { description, sender, receiver } = req.body

    let senderConversation = await Conversation.findOne({ "sender": sender, "receiver": receiver })
    if (!senderConversation) {
        senderConversation = new Conversation()
        senderConversation.sender = sender
        senderConversation.receiver = receiver
    }
    senderConversation.lastMessage = description
    senderConversation.lastMessageDate = Date()
    senderConversation.save()

    let receiverConversation = await Conversation.findOne({ "sender": receiver, "receiver": sender })
    if (!receiverConversation) {
        receiverConversation = new Conversation()
        receiverConversation.sender = receiver
        receiverConversation.receiver = sender
    }
    receiverConversation.lastMessage = description
    receiverConversation.lastMessageDate = Date()
    receiverConversation.save()

    const newMessage = new Message()
    newMessage.description = description
    newMessage.senderConversation = senderConversation._id
    newMessage.receiverConversation = receiverConversation._id
    newMessage.save()

    res.status(200).send({ message: "success", newMessage: newMessage ,conversation:senderConversation })
}

export async function deleteMessage (req, res) {
    const message = await Message.findById(req.body._id).remove()
    res.status(200).send({ message: "success", message: message })
}

export async function deleteConversation (req, res) {
    const conversation = await Conversation.findById(req.body._id).remove()
    res.status(200).send({ message: "success", conversation })
}

export async function deleteAll (req, res) {
    Conversation.remove({}, function (err) {
        if (err) { return handleError(res, err) }
    })
    Message.remove({}, function (err) {
        if (err) { return handleError(res, err) }
    })

    res.status(204).send({ message: "done" })
}