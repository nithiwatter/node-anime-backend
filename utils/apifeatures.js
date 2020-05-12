class APIFeatures {
  constructor(query, queryStringObj) {
    this.query = query;
    this.queryStringObj = queryStringObj;
  }

  filter() {
    let queryStringObj = { ...this.queryStringObj };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryStringObj[el]);

    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(
      /\b(?:gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStringObj.sort) {
      const sortBy = this.queryStringObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  select() {
    if (this.queryStringObj.fields) {
      const fields = this.queryStringObj.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryStringObj.page) || 1;
    const limit = parseInt(this.queryStringObj.limit) || 50;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
