stats = {};

stats.fps = 0;
stats.avgFps = 0;
stats.fpsStartTime = 0;
stats.fpsEndTime = 0;
stats.frametimes = [0,0,0,0,0,0,0,0,0,0]

stats.log = 0;
stats.avgLog = 0;
stats.logStarTime = 0;
stats.logEndTime = 0;
stats.logtimes = [0,0,0,0,0,0,0,0,0,0]

stats.rnd = 0;
stats.avgRnd = 0;
stats.rndStartTime = 0;
stats.rndEndTime = 0;
stats.rndtimes = [0,0,0,0,0,0,0,0,0,0]

 stats.update = function()
 {

   stats.fps = 1000/(stats.fpsEndTime - stats.fpsStartTime)
   stats.frametimes.push(stats.fps)
   stats.frametimes.shift()

   stats.log = (stats.logEndTime - stats.logStartTime)
   stats.logtimes.push(stats.log)
   stats.logtimes.shift()

   stats.rnd = (stats.rndEndTime - stats.rndStartTime)
   stats.rndtimes.push(stats.rnd)
   stats.rndtimes.shift()

   var sum = 0;

   for (var i = 0; i < stats.frametimes.length; i++)
   {
     sum += stats.frametimes[i]
   }

   stats.avgFps = Math.round((sum/10)*100)/100;

   var sum = 0;

   for (var i = 0; i < stats.logtimes.length; i++)
   {
     sum += stats.logtimes[i]
   }

    stats.avgLog = sum/10;

   var sum = 0;

   for (var i = 0; i < stats.rndtimes.length; i++)
   {
     sum += stats.rndtimes[i]
   }

    stats.avgRnd = (sum/10);



   $('#fps').text(stats.avgFps + " ")
   $('#log').text(stats.avgLog +" ")
   $('#rnd').text(stats.avgRnd + " ")
 }

 stats.calcFps = function()
 {
    stats.fpsStartTime = stats.fpsEndTime;
    stats.fpsEndTime = Date.now()
 }

 stats.logStart = function()
 {
    stats.logStartTime = Date.now()
 }

 stats.logEnd = function()
 {
     stats.logEndTime = Date.now()
 }

 stats.rndStart = function()
 {
    stats.rndStartTime = Date.now()
 }

 stats.rndEnd = function()
 {
     stats.rndEndTime = Date.now()
 }
