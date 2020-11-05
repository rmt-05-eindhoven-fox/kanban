<template>
    <div class="mainpage">
                <button @click.prevent="logout"></button>
                <section class="card-list">
                    <article class="card">
                        <header style="background-color: #30BFBF;" class="card-header">
                        <h2>Backlog</h2>
                        </header>
                        <div class="task-body"> 
                            <div class="element-body">
                                <p>New Account Creation Flow</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <div class="element-body">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, dolorum.</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <div class="element-body">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, dolorum.</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <div class="element-body">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, dolorum.</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <div class="element-body">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, dolorum.</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-plus"></i> Add Task
                                </button>
                            </form>
                        </div>
                    </article>
                    <article class="card">
                        <header class="card-header">
                        <h2>Development</h2>
                        </header>
                        <div class="task-body"> 
                            <div class="element-body">
                                <p>New Account Creation Flow</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <div class="element-body">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, dolorum.</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-plus"></i> Add Task
                                </button>
                            </form>
                        </div>
                    </article>
                    <article class="card">
                        <header style="background-color: #8F7EE6;" class="card-header">
                        <h2>Product</h2>
                        </header>
                        <div class="task-body"> 
                            <div class="element-body">
                                <p>New Account Creation Flow</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <div class="element-body">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, dolorum.</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-plus"></i> Add Task
                                </button>
                            </form>
                        </div>
                    </article>
                    <article class="card">
                        <header style="background-color: #77CF1F;" class="card-header">
                        <h2>Done</h2>
                        </header>
                        <div class="task-body"> 
                            <div class="element-body">
                                <p>New Account Creation Flow</p>
                                <div class="card-author">
                                    <a class="author-avatar" href="#">
                                    <img src="avatar.png">
                                    </a>
                                    <div class="author-name">
                                        <span class="badge badge-danger">Server</span>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-plus"></i> Add Task
                                </button>
                            </form>
                        </div>
                    </article>
                </section>
    </div>
</template>

<script>
export default {
    name: "homepage",
    data() {
        return {
        };
    },
};
</script>

<style>

</style>