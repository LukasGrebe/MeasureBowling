/**
 * @constructor
 */
function Roll(val)
{
    if(!(this instanceof Roll))
    {
        return new Roll(val)
    }
    this['reffs'] = [];
    this['char'] = false;
    var value;
    this.val = function(val)
    {
        if(!isNaN(val) && val >= 0 && val <= 10)
        {
            value = val;
        }
        return value;
    }
    this.val(val);
}
/**
 * @constructor
 */
function Frame(prevFrame){
    this['prevFrame'] = prevFrame;
    this['rolls'] = [];
}
Frame.prototype = {
    'getRollVal': function(rollIdx)
    {
        return (this['rolls'][rollIdx] instanceof Roll)?this['rolls'][rollIdx].val():0;
    },
    'score': function()
    {
        return this['getRollVal'](0)+this['getRollVal'](1)+this['getRollVal'](2);
    },
    'isStrike': function()
    {
        return this['getRollVal'](0) == 10;
    },
    'isSpare': function()
    {
        return !this['isStrike']() && this['getRollVal'](0) + this['getRollVal'](1) == 10;
    },
    'partialsCnt': function()
    {
        return this['isStrike']()?1:2;
    },
    'toString': function()
    {
        if(this['isStrike']())
        {
            return 'x';
        }
        if(this['isSpare']())
        {
            return this['getRollVal'](0) + '/';
        }
        var str ='';
        
        if(this['rolls'][0] instanceof Roll)
        {
            str += this['getRollVal'](0);
        }
        if(this['rolls'][1] instanceof Roll)
        {
            str += this['getRollVal'](1);
        }
        return str;
    }
}

/*
    setOrCreateRollObj: function(prop, pinCnt)
    {
        if(this[prop] instanceof Roll)
        {
            this[prop].val(pinCnt);
        }else{
            this[prop] = Roll(pinCnt);
        }
        return this[prop];
    },
    'isStrike': function()
    {
        return this['roll1'] && this['roll1'].val() == 10;
    },
    'isSpare': function()
    {
        return !this['isStrike']() && this['roll1'] && this['roll2'] && (this['roll1'].val() + this['roll2'].val()) == 10;
    },
    'setRoll1': function(roll)
    {
        if(!(roll instanceof Roll))
        {
            //Setting new Value
        
            //Check pinCnt
            if(isNaN(pinCnt) || pinCnt < 0 || pinCnt > 10)
            {
                throw 'Invalid pinCnt';
            }
            
            //Remember possible old associations
            var wasStrike = this['isStrike'](),
                wasSpare = this['isSpare']();
            

            //Set Roll1
            var rollObj = this.setOrCreateRollObj('roll1', pinCnt);
            
            //Update Previous Frame's associations
            if(this.prevFrame && this.prevFrame['isStrike']())
            {
                prevFrame['setRoll2'](rollObj);
            }
            if(this.prevFrame && this.prevFrame['isSpare']())
            {
                prevFrame['setRoll3'](rollObj);
            }

            //Insert new Rolls if previously was Strike or Spare
            if(wasStrike && !this['isStrike']())
            {
                if(this['isSpare']())
                {
                    this['roll2'] = this['roll3'];
                    this['roll3'] = nextFrame['roll1'];
                }else{
                    this['']
                }
                 = undefined;
                 = undefined;
            }
        }else{
            throw 'Can not relink roll1';
        }
        if(this['isStrike']())
        {
            this['roll2'] = nextFrame['roll1'];
            this['roll3'] = nextFrame['roll2'];
            return nextFrame['setRoll1'];
        }else{
            if(wasStrike)
            {
                //terminate nextFrame roll 1 Association!
                this['roll2'] = undefined;
            }
            return this['setRoll2'];
        }
    },
    'setRoll2': function(pinCnt)
    {
        //Check pinCnt
        if(isNaN(pinCnt) || pinCnt < 0 || pinCnt > (10-this['roll1'].val()))
        {
            throw 'Invalid pinCnt';
        }
        this.setOrCreateRoll('roll2', pinCnt);
        return nextFrame['setRoll1'];
    },
    'score': function()
    {
        var s = this['roll1'] || 0 + this['roll2'] || 0;
        return s < 10 ? s : s + nextFrame['roll1']
    }
}

(function(){
    var proto = {};

    proto.

    proto.toString = function() {
        return stringify(this['roll1']) + stringify(this['roll2'], this['roll1']);
    }
    proto.setRoll = function(roll, pinCnt)
    {
        //check roll
        if(isNaN(roll) || roll < 1 || roll > 3)
        {
            throw 'Invalid roll';
        }

        //check pinCnt
        pinCnt = this.numbify(pinCnt, roll==2?this['roll1']:undefined);

        if(isNaN(pinCnt) || pinCnt < 0 || pinCnt > 10)
        {
            throw 'Invalid pinCnt';
        }
        
        //setPinCnt
        this['rolls'][roll] = 
    }
    proto.score = function(){
        return this.firstRoll + this.secondRoll
    }
}

Roll.prototype = {
    numbify = function(pinCnt, prevPinCnt)
    {
        if(pinCnt.match(/^[0-9]$/))
        {
            return parseInt(pinCnt,10);
        }
        if(pinCnt.match(/^[Xx]$/))
        {
            return 10;
        }
        return undefined;
    }
    proto.stringify = function(pinCnt, prevPinCnt)
    {
        if(typeof pinCnt === "undefined")
        {
            return '';
        }
        if(isNaN(prevPinCnt))
        {
            return (pinCnt - 10)? pinCnt+'' : 'x';
        }else{
            return (pinCnt + prevPinCnt - 10)? pinCnt+'' : '/';
        }
    }
}

/**
 * @constructor
 * /
function Frame(nextFrame) {
    this.nextFrame = nextFrame;
}
Frame.prototype = {
    isStrike: function () {
        return this.firstRoll == 10;
    },
    isSpare: function () {
        return this.firstRoll + this.secondRoll == 10;
    },
    getSecondRoll: function () {
        return this.isStrike() ? this.nextFrame.firstRoll : this.secondRoll;
    },
    getScore: function () {
        var retObj = {};
        if (this.isStrike()) {
            retObj.frameScore = 10 + this.nextFrame.firstRoll + this.nextFrame.getSecondRoll();
            retObj.partials = ['x'];

        } else if (this.isSpare()) {
            retObj.frameScore = 10 + this.nextFrame.firstRoll;
            retObj.partials = [this.firstRoll, '/'];
        } else {
            retObj.frameScore = this.firstRoll + this.secondRoll;
            retObj.partials = [this.firstRoll, this.secondRoll];
        }
        return retObj;
    },
    setFirstRoll: function (pinCnt) {
        if (pinCnt < 0 || pinCnt > 10) {
            throw ('Invalid first Roll: ' + pinCnt);
        }
        this.firstRoll = pinCnt;
    },
    setSecondRoll: function (pinCnt) {
        if (this.isStrike()) {
            throw ('No second Roll for Strikes.');
        }
        if (pinCnt < 0 || this.firstRoll + pinCnt > 10) {
            throw ('Invalid second Roll: ' + pinCnt + ', given first Roll: ' + this.firstRoll);
        }
        this.secondRoll = pinCnt;
    }
};

/**
 * @constructor
 * /
function BowlingGame(gameString) {
    var frames = new Array(12),
        prevFrame = null;
    for (var i = 12; i--;) {
        frames[i] = new Frame(prevFrame);
        prevFrame = frames[i];
    }
    this.frames = frames;
    this.nextRoll = {
        frame: 1,
        roll: 1
    };

    if (gameString) {
        this.parseGameString(gameString);
    }
}
BowlingGame.prototype = {

    getFrameScores: function () {
        var scores = [],
            gameScore = 0;
        for (var i = 0; i < 10; i++) {
            var frameObj = this.frames[i].getScore();
            gameScore += frameObj.frameScore;
            frameObj.gameScore = gameScore;

            if (i == 9) {
                var frame10 = this.frames[i];
                //damn 10th frame
                if (frame10.isStrike() || frame10.isSpare()) {
                    var frame11 = frame10.nextFrame;
                    if (frame11.firstRoll < 10) {
                        frameObj.partials.push(frame11.firstRoll);
                    } else {
                        frameObj.partials.push('x');
                    }
                    if (frame10.isStrike()) {
                        var secondBonus = frame11.getSecondRoll();
                        frameObj.partials.push(secondBonus == 10 ? 'x' : secondBonus);
                    }
                }
            }
            scores.push(frameObj);

        }
        return scores;
    },
    adjust10thFrameRoll: function (roll) {
        var frame = 10;
        //Adjust Values
        if (roll > 1) {
            //2nd or 3rd Roll.
            if (this.frames[frame - 1].isStrike()) {
                //10th Frame is Strike, 2nd or 3rd roll. -> 1st or 2nd roll of 11th Frame
                frame++; //-> Frame 11
                roll--; //-> roll 1 or 2
                if (roll > 1 && this.frames[frame - 1].isStrike()) {
                    //3rd roll of 10th frame with 1st & 2nd roll beeing a strike.
                    //set as first roll of 12th frame.
                    frame++; //--> Frame 12
                    roll--; //--> roll 1
                }
            } else if (roll > 2) {
                //10th Frame, 3rd Roll no Strike -> 11th Frame 1st Roll;
                frame++;
                roll = 1;
            }
        }
        return {
            frame: frame,
            roll: roll
        };
    },
    getPossibleRolls: function (frame, roll) {
        if (!frame || !roll) {
            frame = this.nextRoll.frame;
            roll = this.nextRoll.roll;
        }
        if (frame == 10) {
            var fr = this.adjust10thFrameRoll(roll);
            frame = fr.frame;
            roll = fr.roll;
        }

        function buildNrArr(max, finalString) {
            var arr = [];
            for (var i = max; i--;) {
                arr.unshift(i);
            }
            arr.push(finalString);
            return arr;
        }

        if (roll == 2) {
            if (this.frames[frame - 1].isStrike()) {
                return [];
            } else {
                return buildNrArr(10 - this.frames[frame - 1].firstRoll, 'Spare');
            }
        } else {
            return buildNrArr(10, 'Strike');
        }
    },
    parseGameString: function (gameString) {
        gameString = gameString.toLowerCase();
        var t = gameString.match(/[^0-9x\\\/]/);
        if (t) {
            throw 'Invalid character(s): ' + t.join('');
        }
        for (var i = 0, n = gameString.length; i < n; i++) {
            var r = gameString[i];
            if (r == 'x') {
                r = 10;
            } else if (r == '/' || r == '\\') {
                r = 10 - parseInt(gameString[i - 1], 10);
                if (isNaN(r)) {
                    throw "Invalid game string: Spare '/' must follow a number";
                }
            }
            this.roll(r);
        }
    },
    getGameString: function () {
        return this.getFrameScores().map((
            function(frame){
                return frame.partials.join('')
            })).join('');
    },
    roll: function (pinCnt) {
        pinCnt = parseInt(pinCnt, 10);
        if (isNaN(pinCnt) || pinCnt < 0 || pinCnt > 10) {
            throw 'Invalid number of Pins: ' + pinCnt;
        }
        this.setRoll(this.nextRoll.frame, this.nextRoll.roll, pinCnt);
    },
    setRoll: function (frame, roll, pinCnt) {
        //Check Values
        if (frame < 1 || frame > 10) {
            throw ('Invalid Frame: ' + frame);
        }

        if (roll < 1 || (frame < 10 && roll > 2) || (frame == 10 && roll > 3)) {
            throw ('Invalid Roll:' + roll);
        }

        if (frame == 10) {
            var fr = this.adjust10thFrameRoll(roll);
            frame = fr.frame;
            roll = fr.roll;
        }

        //Set Roll
        if (roll == 1) {
            this.frames[frame - 1].setFirstRoll(pinCnt);
        } else if (roll == 2) {
            this.frames[frame - 1].setSecondRoll(pinCnt);
        } else {
            throw ('Invalid roll: ' + roll + ' for Frame: ' + frame);
        }

        //Set next Roll Pointer
        if (frame < 10 && (pinCnt == 10 || roll == 2)) {
            //Strike or second roll outside 10th frame -> move to next Frame!
            this.nextRoll.roll = 1;
            this.nextRoll.frame++;
        } else {
            this.nextRoll.roll++;
        }
    }
};

window['BowlingGame'] = BowlingGame;
*/