let app = new Vue({
	el: "#app",
	data: {
		msg: "hello phase 2",
		text: "hai",
		pageName: "board-page",
		imgLanding: "./img/kanbattetransparent.png",
		isShow: false,
		email: "",
		password: "",
		title: "",
		description: "",

		tasks: [
			{
				id: 1,
				title: "belajar server",
				description: "persiapan livecode",
				UserId: 1,
				CategoryId: "1",
			},
			{
				id: 2,
				title: "belajar Vue",
				description: "biar jago",
				UserId: 1,
				CategoryId: "1",
			},
			{
				id: 3,
				title: "belajar RUBY",
				description: "biar jago",
				UserId: 1,
				CategoryId: "2",
			},
			{
				id: 5,
				title: "belajar JQUERY",
				description: "biar jago",
				UserId: 1,
				CategoryId: "3",
			},
			{
				id: 4,
				title: "belajar socket",
				description: "biar jago",
				UserId: 1,
				CategoryId: "3",
			},
			{
				id: 6,
				title: "belajar socket",
				description: "biar jago",
				UserId: 1,
				CategoryId: "3",
			},
		],
	},
	methods: {
		changePage(name) {
			this.pageName = name;
		},
		showAddTask() {
			this.isShow = true;
		},
		closeAddTask() {
			this.isShow = false;
		},
		addTask() {
			console.log("add task masuk");
			let data = {
				title: this.title,
				description: this.description,
				id: this.tasks.length + 1,
				CategoryId: 4,
			};
			this.tasks.push(data);
			console.log(this.tasks);
		},
	},
	beforeCreate() {
		console.log(this.msg, " <<<< before create!");
	},
	created() {
		console.log(this.msg, " <<<< before create!");
	},
	mounted() {
		console.log(this.msg, " <<<< before create!");
	},
});
