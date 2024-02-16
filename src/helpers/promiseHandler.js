const makeCancelablePromise = (promise) => {
  let cancel;
  const wrappedPromise = new Promise((resolve, reject) => {
    cancel = reject;
    promise.then((val) => resolve(val)).catch((error) => reject(error));
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      console.log("cancel");
      cancel({ isCanceled: true });
    },
  };
};

class PromiseHandler {
  #executor;

  constructor() {
    this.#executor = null;
  }

  takeLatest(promise) {
    if (this.#executor) {
      this.#executor.cancel();
    }

    this.#executor = makeCancelablePromise(promise);

    return this.#executor.promise;
  }
}

export default PromiseHandler;
