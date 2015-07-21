<app>
  <slidedeck ref="{ firebaseRef }"
             slidedispatcher="{ slideDispatcher }"
             slidestore="{ slideStore }"
             slidedeckstore="{ slideDeckStore }"></slidedeck>
  <script>
    this.firebaseRef = new Firebase("https://flux-test.firebaseio.com/");
    this.slideDispatcher = new Dispatcher();
    this.slideStore = new SlideStore({
      dispatcher: this.slideDispatcher,
      fbRef: this.firebaseRef
    });
    this.slideDeckStore = new SlideDeckStore({
      dispatcher: this.slideDispatcher,
      slideStore: this.slideStore
    });
  </script>
</app>
