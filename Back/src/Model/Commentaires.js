class Commentaires {
  constructor(description, UserId, id_Commentaires, createdAt) {
    this.id_ = id_Commentaires;
    this.description = description;
    this.UserId = UserId;
    this.createdAt = createdAt;
  }
}
module.exports = { Commentaires };
