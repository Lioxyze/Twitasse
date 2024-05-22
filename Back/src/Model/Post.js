class Tweet {
  constructor(
    id,
    picture,
    pseudo,
    name,
    email,
    password,
    UserId,
    isActive,
    gdpr
  ) {
    this.id = id;
    this.picture = picture;
    this.pseudo = pseudo;
    this.title = name;
    this.image = email;
    this.description = password;
    this.UserId = UserId;
    this.isActive = isActive;
    this.gdpr = gdpr;
  }
}
module.exports = { Tweet };
