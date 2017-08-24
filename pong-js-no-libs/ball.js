function Ball() {
    var ball = {
        position: {
            x: 0,
            y: 0
        },
        startPosition: {
            x: 0,
            y: 0
        },
        roundedBallPosition:{
            x: 0,
            y: 0
        },
        speed: {
            x: 0,
            y: 0
        },
        maxballspeed: {
            x: 0,
            y: 0 
        },
        minballspeed: {
            x: 0,
            y: 5
        },
        size: {
            x: 1,
            y: 1
        },
        color: "#FFFFFF"
    };

    return ball;
}