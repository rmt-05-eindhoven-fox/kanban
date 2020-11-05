<template>
  <nav class="navbar">
    <ul class="navbar-nav">
        <li class="nav-item">
            <span class="nav-link">
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="space-station-moon-alt"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x"
            >
                <g class="fa-group">
                <path
                    fill="currentColor"
                    d="M501.70312,224H448V160H368V96h48V66.67383A246.86934,246.86934,0,0,0,256,8C119.03125,8,8,119.0332,8,256a250.017,250.017,0,0,0,1.72656,28.26562C81.19531,306.76953,165.47656,320,256,320s174.80469-13.23047,246.27344-35.73438A250.017,250.017,0,0,0,504,256,248.44936,248.44936,0,0,0,501.70312,224ZM192,240a80,80,0,1,1,80-80A80.00021,80.00021,0,0,1,192,240ZM384,343.13867A940.33806,940.33806,0,0,1,256,352c-87.34375,0-168.71094-11.46094-239.28906-31.73633C45.05859,426.01953,141.29688,504,256,504a247.45808,247.45808,0,0,0,192-91.0918V384H384Z"
                    class="fa-secondary"
                ></path>
                <path
                    fill="currentColor"
                    d="M256,320c-90.52344,0-174.80469-13.23047-246.27344-35.73438a246.11376,246.11376,0,0,0,6.98438,35.998C87.28906,340.53906,168.65625,352,256,352s168.71094-11.46094,239.28906-31.73633a246.11376,246.11376,0,0,0,6.98438-35.998C430.80469,306.76953,346.52344,320,256,320Zm-64-80a80,80,0,1,0-80-80A80.00021,80.00021,0,0,0,192,240Zm0-104a24,24,0,1,1-24,24A23.99993,23.99993,0,0,1,192,136Z"
                    class="fa-primary"
                ></path>
                </g>
            </svg>
            <span class="link-text">
                <h3>Account</h3>
            </span>
            </span>

        </li>
        <li class="nav-item">
            <span class="link-text"><h4>Mansur@gmail.com</h4></span>
        </li>
        <br>
        <li class="nav-item">
            <span class="link-text"><button @click.prevent="logout">Logout</button></span>
        </li>
    </ul>
  </nav>
</template>

<script>
export default {
    name: 'rightNav',
    data() {
        return {}
    },
    methods: {
        logout() {
            this.$emit('logout', 'landing-page');
        }
    }
}
</script>

<style>
:root {
  font-size: 16px;
  font-family: 'Open Sans';
  --text-primary: #b6b6b6;
  --text-secondary: #ececec;
  --bg-primary: #333C40;
  --transition-speed: 600ms;
}

body {
  color: #333C40;
  background-color: white;
  margin: 0;
  padding: 0;
}

body::-webkit-scrollbar {
  width: 0.25rem;
}

body::-webkit-scrollbar-track {
  background: #1e1e24;
}

body::-webkit-scrollbar-thumb {
  background: #6649b8;
}

main {
  margin-left: 5rem;
  padding: 1rem;
}

.navbar {
  position: fixed;
  background-color: var(--bg-primary);
  transition: width 600ms ease;
  right: 0;
}

.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex; 
  flex-direction: column;
  align-items: center;
  height: 100%;

}

.nav-item {
    width: 100%;
    text-align: center;
}


.nav-link {
  display: flex;
  align-items: center;
  height: 5rem;
  margin-left: -30px;
  color: var(--text-primary);
  text-decoration: none;
  filter: grayscale(100%) opacity(0.7);
  transition: var(--transition-speed);
}

.nav-link:hover {
  margin-left: -30px;
  filter: grayscale(0%) opacity(1);
}

.link-text {
  display: none;
  margin-left: 1rem;
  color: #EAEEEF;
}

.sidebar-text {
    display: none;
    margin-left: 1rem;
}
.nav-link svg {
  width: 2rem;
  min-width: 2rem;
  margin: 0 1.5rem;
}

.fa-primary {
  color: #ff7eee;
}

.fa-secondary {
  color: #df49a6;
}

.fa-primary,
.fa-secondary {
  transition: var(--transition-speed);
}


  .navbar {
    top: 0;
    width: 50px;
    height: 100vh;
  }

  .navbar:hover {
    width: 16rem;
  }

  .navbar:hover .link-text {
    display: block;
  }

  .navbar:hover .sidebar-text {
      display: block;
  }



.dark {
  --text-primary: #b6b6b6;
  --text-secondary: #ececec;
  --bg-primary: #23232e;
  --bg-secondary: #141418;
}

.light {
  --text-primary: #1f1f1f;
  --text-secondary: #000000;
  --bg-primary: #ffffff;
  --bg-secondary: #e4e4e4;
}

.solar {
  --text-primary: #576e75;
  --text-secondary: #35535c;
  --bg-primary: #fdf6e3;
  --bg-secondary: #f5e5b8;
}

.theme-icon {
  display: none;
}

.dark #darkIcon {
  display: block;
}

.light #lightIcon {
  display: block;
}

.solar #solarIcon {
  display: block;
}
</style>