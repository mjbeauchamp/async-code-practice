//this is an over-simplified version of the Promise class that we have access to in vanilla JS. This can give you an idea of the logic of what's going on under the hood in a Promise

class PromiseSimplified {
    constructor(executionFunction) {
      this.promiseChain = [];
      this.handleError = () => {};
  
      this.onResolve = this.onResolve.bind(this);
      this.onReject = this.onReject.bind(this);
  
      executionFunction(this.onResolve, this.onReject);
    }
  
    then(onResolve) {
      this.promiseChain.push(onResolve);
  
      return this;
    }
  
    catch(handleError) {
      this.handleError = handleError;
  
      return this;
    }
  
    onResolve(value) {
      let storedValue = value;
  
      try {
        this.promiseChain.forEach((nextFunction) => {
           storedValue = nextFunction(storedValue);
        });
      } catch (error) {
        this.promiseChain = [];
  
        this.onReject(error);
      }
    }
  
    onReject(error) {
      this.handleError(error);
    }
  }
  
  module.exports = PromiseSimplified;