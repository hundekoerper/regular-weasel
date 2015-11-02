describe('Linter', function() {
  var Linter
  ,   database
  ,   profile;

  beforeEach(function() {
    Linter = require('../lib/Linter');
    // database = require('../node_modules/caniuse-db/data.json');
    // profile = require('../profile.json');
  });

  describe('isUsable method', function() {
    it('should return true if indicator starts with a "y"', function() {
      var testString = 'yolo';
      expect(Linter.prototype.isUsable(testString)).toBe(true);
    });

    it('should return false if indicator does not start with a "y"', function() {
      var testString = 'swag';
      expect(Linter.prototype.isUsable(testString)).toBe(false);
    });
  });

  describe('isRelevantRange method', function() {
    it('should return true if target version satisfies range', function() {
      var testVersion = '1.2.3';
      expect(Linter.prototype.isRelevantRange(testVersion, '1.x')).toBe(true);
    });

    it('should return true if range is above target version', function() {
      var testVersion = '1.2.3';
      expect(Linter.prototype.isRelevantRange(testVersion, '2.x')).toBe(true);
    });

    it('should return false if range is lower than target version ', function() {
      var testVersion = '1.2.3';
      expect(Linter.prototype.isRelevantRange(testVersion, '1.1.x')).toBe(false);
    });

    it('should not complain when test version is missing minor/patch level', function () {
      var testVersion = '1';
      expect(Linter.prototype.isRelevantRange(testVersion, '2.x')).toBe(true);
    })

    it('should not complain when range has non semver format', function () {
      var testRange = '1.0.0-2.0.0';
      expect(Linter.prototype.isRelevantRange('1.0.0', testRange)).toBe(true);
    })
  });

  describe('forEachUsedProperty method', function() {
    var testUsedproperties
    ,   testDatabase;

    beforeEach(function () {
      testUsedproperties = {
        'border-radius': [2, 4]
      };
      testDatabase = {
        data: {
          'border-radius': 'something'
        }
      };
    });

    it('should execute callback with expected parameters', function() {
      var testLinter = new Linter(testUsedproperties, testDatabase)
      ,   callbackSpy = jasmine.createSpy('callback');

      testLinter.forEachUsedProperty(callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith('border-radius', 'something', [2, 4]);
    });

    it('should not execute callback when property is not present in database', function() {
      delete testDatabase.data['border-radius'];
      var testLinter = new Linter(testUsedproperties, testDatabase)
      ,   callbackSpy = jasmine.createSpy('callback');

      testLinter.forEachUsedProperty(callbackSpy);

      expect(callbackSpy).not.toHaveBeenCalled();
    });

  });

  describe('forEachBrowser method', function() {
    it('should execute callback with expected parameters', function() {
      var callbackSpy = jasmine.createSpy('callback');

      Linter.prototype.forEachBrowser.call({
        profile: {
          browsers: {
            foo: '6.0'
          }
        }
      }, callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith('6.0','foo')
    })

    it('should not execute callback when browser value is falsy', function() {
      var callbackSpy = jasmine.createSpy('callback');

      Linter.prototype.forEachBrowser.call({
        profile: {
          browsers: {
            foo: false
          }
        }
      }, callbackSpy);

      expect(callbackSpy).not.toHaveBeenCalled()
    })

  });

  describe('forEachUsedPropertyInBrowserVersion method', function() {
    it('should execute callback with expected parameters', function() {
      var caniuseIndicator = 'y'
      ,   caniuseRange = 'droelf'
      ,   targetVersion = {}
      ,   canIUsefoozilla = {
        'droelf': 'y'
      }
      ,   browserKey = 'foozilla'
      ,   propertyName = {}
      ,   caniuseProp = {
        stats: {
          'foozilla': canIUsefoozilla
        }
      }
      ,   lines = {}
      ,   forEachBrowserSpy = jasmine.createSpy('forEachBrowser')
      ,   forEachUsedPropertySpy = jasmine.createSpy('forEachUsedProperty')
      ,   callbackSpy = jasmine.createSpy('callback');

      forEachBrowserSpy.and.callFake(function(cb) {
        cb(targetVersion, browserKey);
      });

      forEachUsedPropertySpy.and.callFake(function(cb) {
        cb(propertyName, caniuseProp, lines);
      });

      Linter.prototype.forEachUsedPropertyInBrowserVersion.call({
        forEachBrowser: forEachBrowserSpy,
        forEachUsedProperty: forEachUsedPropertySpy
      }, callbackSpy);

      expect(callbackSpy).toHaveBeenCalled();

      var args = callbackSpy.calls.argsFor(0)[0];
      expect(args.caniuseIndicator).toBe(caniuseIndicator);
      expect(args.caniuseRange).toBe(caniuseRange);
      expect(args.targetVersion).toBe(targetVersion);
      expect(args.browserKey).toBe(browserKey);
      expect(args.propertyName).toBe(propertyName);
      expect(args.caniuseProp).toBe(caniuseProp);
      expect(args.lines).toBe(lines);
    });
  });

  describe('createCanNotUseEntry method', function() {
    it('should create a new caniuse object based on intersection',function() {
      var notes = {}
      ,   title = {}
      ,   description = {}
      ,   notesByNum = {}
      ,   lines = {}
      ,   canNotUseEntry = Linter.prototype.createCanNotUseEntry({
        caniuseProp: {
          notes: notes,
          title: title,
          description: description,
          'notes_by_num': notesByNum
        },
        lines: lines
      });

      expect(canNotUseEntry.notes).toBe(notes);
      expect(canNotUseEntry.title).toBe(title);
      expect(canNotUseEntry.description).toBe(description);
      expect(canNotUseEntry.notesByNum).toBe(notesByNum);
      expect(canNotUseEntry.lines).toBe(lines);
      expect(canNotUseEntry.incompatibleBrowsers).toEqual({});
    });
  });

  describe('addIncompatibleBrowsers method', function() {
    it('should add incompatible browsers to the canNotUseEntry object', function() {
      var testcanNotUseObject = { incompatibleBrowsers: {}}
      ,   testintersectionObject = {
        caniuseIndicator: 'y',
        caniuseRange: 'droelf',
        browserKey: 'foozilla'
      };
      Linter.prototype.addIncompatibleBrowsers(testcanNotUseObject, testintersectionObject);
      expect(testcanNotUseObject.incompatibleBrowsers['foozilla']).toEqual({'droelf': 'y'});
    });

    it('should create browser entry does not exist if it doesnt exist yet', function() {
      var testcanNotUseObject = { incompatibleBrowsers: {}}
      ,   testintersectionObject = { browserKey: 'foozilla' };
      Linter.prototype.addIncompatibleBrowsers(testcanNotUseObject, testintersectionObject);
      expect(testcanNotUseObject.incompatibleBrowsers['foozilla']).not.toBeUndefined();
    });

  });

});
