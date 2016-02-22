'use strict';
(function () {
    var gameEngine = {
        ctx: null,
        worldMap: null,
        start: function (config) {
            var worldMap = document.getElementById(config.name);
            this.worldMap = worldMap;
            
            this.levels.components = config.components;
            this.levels.getLevel(1);
        },
        
        http: {
            get: function (url, data, callback) {
                var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onreadystatechange = function() {
                    
                        if (xhr.readyState === 4) {
                            if(xhr.status === 200) {
                                callback(xhr.responseText);
                            }
                        }
                    }
                    xhr.send(data);
            }
        },
        
        levels: {
            components: [],
            getLevel: function (id) {
                gameEngine.http.get('http://127.0.0.1:60727/levels/map.json', { id: 1 }, function(data){
                    var level = JSON.parse(data);
                    gameEngine.levels.createLevel(level);
                });
            },
            
            createLevel: function (level) {
                gameEngine.worldMap.setAttribute('width',level.length * 64);
                gameEngine.worldMap.setAttribute('height',level[0].length * 64);
                gameEngine.ctx = gameEngine.worldMap.getContext('2d');
                for(var x = 0; x < level.length; x++){
                    for(var y = 0; y < level[x].length; y++){
                        var img = new Image();
                            img.src = this.components[level[x][y]].img;
                            gameEngine.ctx.drawImage(img, y*64, x*64, 64, 64);
                    }
                }
            }
        
        }
    };
    
    window.$game = gameEngine;
})();