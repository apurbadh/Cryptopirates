$(document).ready(function(){setInterval(function(){$('.countdown').each(function(){var time=$(this).text().split(':');var timestamp=time[0]*3600+ time[1]*60+ time[2]*1;timestamp-=timestamp>0;var hours=Math.floor(timestamp/3600);var minutes=Math.floor((timestamp- hours*3600)/ 60);
var seconds=timestamp- hours*3600- minutes*60;if(hours<10){hours='0'+ hours;}
if(minutes<10){minutes='0'+ minutes;}
if(seconds<10){seconds='0'+ seconds;}
$(this).text(hours+':'+ minutes+':'+ seconds);});},1000);})
$(document).ready(function(){$('#loader').click(function(){$.get('/loader', function(data){$('#space').append(data)})})});

