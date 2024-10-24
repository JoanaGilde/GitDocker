new Vue({
  el: '#app',
  data: {
    gameInterval: null,
    runnerPosition: 0,
    isJumping: false,
    jumpHeight: 200,
    gravity: 0.8,  // Adjusted gravity for slower jumps
    obstacles: [],
    obstacleSpeed: 2,  // Speed at which obstacles move
    score: 0,
    isGameOver: false,
    obstacleImages: [
      'img/Docker.png',
      'img/github.png'
    ],
    spawnInterval: null,
  },
  methods: {
    startGame() {
      this.resetGame();

       // Start the game loop using requestAnimationFrame for smoother rendering
    const gameLoop = () => {
      if (!this.isGameOver) {
        this.gameLoop();
        requestAnimationFrame(gameLoop); // Recursively call the loop
      }
    };

    requestAnimationFrame(gameLoop);
      // Start the game loop (slowed down to 50ms per iteration)
      //this.gameInterval = setInterval(this.gameLoop, 20);

      // Spawn obstacles independently at regular intervals (e.g., every 2-3 seconds)
      this.spawnInterval = setInterval(this.spawnObstacle, 1250);
    },
    resetGame() {
      this.isGameOver = false;
      this.isJumping = false;
      this.runnerPosition = 0;
      this.obstacles = [];

      // Clear intervals to avoid multiple loops during restart
      clearInterval(this.gameInterval);
      clearInterval(this.spawnInterval);
    },
    gameLoop() {
      if (!this.isGameOver) {
        // Move obstacles
        this.moveObstacles();
        // Check for collisions
        this.checkCollision();

        // Gravity effects for jumping
        if (this.isJumping) {
          this.runnerPosition -= this.gravity;
          if (this.runnerPosition <= 0) {
            this.isJumping = false;
            this.runnerPosition = 0; // Back to ground level
          }
        }
      }
    },
    jump() {
      if (!this.isJumping && !this.isGameOver) {
        this.isJumping = true;
        this.runnerPosition = this.jumpHeight;
      }
    },
    moveObstacles() {
      this.obstacles = this.obstacles.map(obstacle => {
        obstacle.position += this.obstacleSpeed;  // Move left
        return obstacle;
      }).filter(obstacle => obstacle.position < 1000); // Remove off-screen obstacles
    },
    spawnObstacle() {
      // Randomly choose an obstacle image from the pool
      const randomImage = this.obstacleImages[Math.floor(Math.random() * this.obstacleImages.length)];
      this.obstacles.push({
        position: -50,  // Start just off the right side of the screen
        width: 50,
        height: 50,
        image: randomImage
      });
    },
    checkCollision() {
      const runnerCenter = {
        x: 50 + 25, // Runner's X position + half the width (center)
        y: this.runnerPosition + 25 // Runner's Y position + half the height (center)
      };
    
      let closestObstacle = null;
      let closestDistance = Infinity; // Start with a large number to compare distances

      this.obstacles.forEach(obstacle => {
        const obstacleCenter = {
          x: 1000 - obstacle.position + 25, // Obstacle's X position + half width
          y: 25 // Obstacle is on the ground, so its Y center is half its height
        };
    
        // Calculate the distance between runner and obstacle centers
        const distanceX = Math.abs(runnerCenter.x - obstacleCenter.x);
        const distanceY = Math.abs(runnerCenter.y - obstacleCenter.y);
        const closestPossible = obstacleCenter.x - runnerCenter.x;

        if (closestPossible > 0 && distanceX < closestDistance) {
          closestDistance = distanceX;
          closestObstacle = obstacle;
        }




        // Check if the distance between centers is less than a threshold (50 is the size of the runner/obstacle)
        if (distanceX < 30 && distanceY < 20) {
          this.isGameOver = true;
          clearInterval(this.gameInterval);
          clearInterval(this.spawnInterval);

          console.log('Closest Obstacle:', closestObstacle);
          if (closestObstacle.image == "img/github.png")
          {
            alert('37 conflitos no merge! G A M E O V E R');
          }
          else{
            alert('Illegal instruction exception! G A M E O V E R');
          }

        }
      });
    }
    
  },
  mounted() {
    window.addEventListener('keydown', this.jump);
  },
});





//--------------- ISTO É PARA O .html !!!!! --------------------------
// Para propósitos de prototipação ou aprendizado, você pode usar a versão mais recente com:
// <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
// ou linha de comandos do code: npm install vue


//Para produção, recomendados vincular a um número de versão específico para evitar quebra de funções das versões mais novas:
// <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>

// Se você está usando Modulos ES nativos, existe uma build compatível com isso:
/* 
<script type="module">
  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
</script>
*/

// Você pode navegar pelos códigos-fonte do pacote NPM em cdn.jsdelivr.net/npm/vue
