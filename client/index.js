let anything = { a: 1 };

let app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
  },
});

let app2 = new Vue({
  el: "#app-2",
  data: {
    message: "Hello everyone",
  },
  methods: {
    newMessage: function () {
      if (this.message == "Hello everyone") this.message = "Hello everybody";
      else {
        this.message = "Hello everyone";
      }
    },
  },
});

let app3 = new Vue({
  el: "#app-3",
  data: {
    message: "Hello",
    letsgo: "Checkthis out",
    any1: anything,
    msg: "change",
    htmlInside: `<h2 style="color:blue">hello everyone</p>`,
  },
  methods: {
    changeText: function () {
      this.msg = "changed";
    },
  },
});
