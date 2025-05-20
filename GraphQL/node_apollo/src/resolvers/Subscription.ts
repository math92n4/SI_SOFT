import pubsub from "../database/pubSubUtil.js";

const Subscription = {
    bookAdded: { subscribe: () => pubsub.asyncIterator('BOOK_ADDED') }
}

export default Subscription;