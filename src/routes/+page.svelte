<script>
  const toggleTheme = () => {
    if (document.body.classList.contains('light')) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      moon.classList.remove('moon');
      moon.classList.add('sun');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      moon.classList.remove('sun');
      moon.classList.add('moon');
    }
  };
</script>

<h1>To Do Later</h1>
<h2>Go to <a href="/Random-Quote">Random-Quote</a> instead</h2>

<!-- 
<div class="moon">
  <div class="moon-after" />
</div>
<button class="theme-toggle">Toggle Theme</button> -->

<style>
  .moon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ffffff;
    position: relative;
  }

  .sun {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ffff00;
    position: relative;
  }

  .moon:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #000000;
    opacity: 0.5;
  }
</style>
