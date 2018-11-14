var readDir;
document.addEventListener("deviceready", onDeviceReady, true);
function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onError);
}
function onFileSystemSuccess(fs) {
    //選擇資料夾
    fs.root.getDirectory(fs.root.fullPath,
    { create: false, exclusive: false }, getDir, onError);
}
function getDir(getentry) {
    var dirReader = getentry.createReader();
    dirReader.readEntries(getsuccess, onError);
}
//
//建立資料夾下的檔案清單
function getsuccess(entries) {
    var i;
    $('#dirList').empty();
    for (i = 0; i < entries.length; i++) {

        $('#dirList').append('<li value="' + entries[i].name + '"> <a class="ui-btn ui-icon-eye ui-btn-icon-left" data-ajax="false" > ' + entries[i].name + '</a></li>');
    }
    $('#dirList').listview("refresh");
    $("#dirList li").click(function () {

        // alert($(this).attr('value'));//確認讀取的資料是否正常

        readDir = $(this).attr('value');
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, goDir, onError); //進入播放function
    });
    //播放Play Music
}
//
function goDir(f) {
    // alert(readDir);
    f.root.getDirectory(readDir,
      { create: false, exclusive: false }, readsuccess, onError);
}

//讀取資料夾
function readsuccess(readentry) {
    var dirRead = readentry.createReader();
    dirRead.readEntries(goplay, onError);
}
//Error
function onError(error) {
    alert("Failed to list directory contents: " + error.code);
}

function goplay(entries) {
    var i;
    // var j = 0;
    var objectType;
    $('#dirList').empty();
    for (i = 0; i < entries.length; i++) {
        if ((entries[i].name).substr(-3) == 'mp3') {
            $('#dirList').append('<li value="' + entries[i].toURI() + '"> <a class="ui-btn ui-icon-audio ui-btn-icon-left" data-ajax="false" > ' + entries[i].name + '</a></li>');
            // alert(entries[j].name);
            //       j++;
        }
    }
    $('#dirList').listview("refresh");
    $("#dirList li").click(function () {

        // alert($(this).attr('value'));//確認讀取的資料是否正常

        var getMusic = $(this).attr('value');
        playAudio(getMusic); //進入播放function
    });
    //播放Play Music

    function playAudio(getMusic) {
        var myMedia = null;
        var mediaTimer = null;

        var src = getMusic;
        if (myMedia === null) {
            myMedia = new Media(src, onSuccess, onError);
            function onSuccess() {
                console.log("playAudio Success");
            }
            function onError(error) {
                console.log("playAudio Error: " + error.code);
            }
        }
        myMedia.stop();
        myMedia.play();
        if (mediaTimer == null) {
            mediaTimer = setInterval(function () {
                // get my_media position
                myMedia.getCurrentPosition(
                    // success callback
                    function (position) {
                        if (position > -1) {
                            setAudioPosition((position) + " sec");
                        }
                    },
                    // error callback
                    function (e) {
                        console.log("Error getting pos=" + e);
                        setAudioPosition("Error: " + e);
                    }
                );
            }, 1000);
        }


        $("#pauseMusic").click(function () {
            if (myMedia) {
                myMedia.pause();
            }
        });
        // Stop audio
        // 
        $("#stopMusic").click(function () {
            if (myMedia) {
                myMedia.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        });

        // onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
        }

        // Set audio position
        // 
        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }
    }
}