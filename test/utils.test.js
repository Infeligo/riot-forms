describe('Utils test:', function () {

  it('Riot exists', function () {
    expect(riot).to.be.not.undefined;
  });

  describe("ensureArray()", function () {

      it('Ensures array', function () {
        var obj = { 
          foo: [], 
          bar: [ "bar" ], 
          baz: undefined, 
          goo: "goo" 
        };

        expect(ensureArray(obj, "foo")).to.be.an('array');
        expect(ensureArray(obj, "bar")).to.be.an('array');
        expect(ensureArray(obj, "baz")).to.be.an('array');
        expect(ensureArray(obj, "goo")).to.be.an('array');
        expect(ensureArray(obj, "zet")).to.be.an('array');
        
        expect(obj).to.eql({
          foo: [], 
          bar: [ "bar" ], 
          baz: [], 
          goo: [],
          zet: [ ]        
        });
      });

    });

    describe("eachControlOrGroup()", function () {

      it("Traverses all controls and groups", function () {
        var tree = {
          tags: {
            level1_1: {
              name: "node1",
              tags: {
                level2_1: {
                  name: "node2",
                  isFormControl: true,
                  tags: {
                    level3_1: {
                      name: "node3", 
                      isFormControl: true 
                    }
                  } 
                },
                level2_2: {
                  name: "node4",
                  isFormGroup: true, 
                  tags: {
                    level3_2: {
                      name: "node5",
                      isFormControl: true
                    }
                  }
                }
              }
            },
            level1_2: {
              name: "node6",
              tags: null
            },
            level1_3: [
              {
                name: "node7",
                tags: {
                  level2_3: {
                    tags: [
                      { 
                        name: "node8",
                        isFormControl: true 
                      },
                      { 
                        name: "node9",
                        isFormControl: true 
                      }
                    ]
                  },
                  level2_4: {
                    name: "node10",
                    tags: {
                      level3_3: {
                        name: "node11",
                      }
                    }
                  }
                }
              },
              {
                name: "node12",
                tags: {
                  level2_5: {
                    name: "node13",
                    isFormControl: true
                  }
                }
              },
              {
                name: "node14",
                isFormControl: true
              },
              {
                name: "node15",
                isFormGroup: true
              },
              {
                name: "node16",
                tags: null
              }
            ]
          }
        };

        var result = [ ];

        eachControlOrGroup(tree, function (obj) {
          result.push(obj.name);
        }, this);

        expect(result).to.eql([
          "node2",
          "node4",
          "node8",
          "node9",
          "node13",
          "node14",
          "node15"
        ]);
        
      })

    });

    describe("flatten()", function () {
      
      it("Flattens nested objects and arrays", function () {

        var obj = {
          foo: "a",
          bar: 1,
          baz: false,
          goo: [
            1, 2, 3
          ],
          goozit: [
            {
              a: 1,
              b: [
                "a",
                {
                  a: 1,
                  b: true,
                  c: [ 1 ]
                }
              ],
              c: {
                a: 1,
                b: {
                  a: {
                    a: 42,
                    b: [
                      1, 2, true, false
                    ]
                  }
                }
              },
              d: [],
              e: [ [ 1 ], [], [ 2 ] ],
              f: {}
            }
          ]
        };

        var flattened = [];
        flatten(obj, "", function (path, value) {
          flattened.push([ path, value ]);
        })

        expect(flattened).to.eql([
          [ "foo", "a" ],
          [ "bar", 1 ],
          [ "baz", false ],
          [ "goo[0]", 1 ],
          [ "goo[1]", 2 ],
          [ "goo[2]", 3 ],
          [ "goozit[0].a", 1 ],
          [ "goozit[0].b[0]", "a" ],
          [ "goozit[0].b[1].a", 1 ],
          [ "goozit[0].b[1].b", true ],
          [ "goozit[0].b[1].c[0]", 1 ],
          [ "goozit[0].c.a", 1 ],
          [ "goozit[0].c.b.a.a", 42 ],
          [ "goozit[0].c.b.a.b[0]", 1 ],
          [ "goozit[0].c.b.a.b[1]", 2 ],
          [ "goozit[0].c.b.a.b[2]", true ],
          [ "goozit[0].c.b.a.b[3]", false ],
          [ "goozit[0].e[0][0]", 1 ],
          [ "goozit[0].e[2][0]", 2 ]
        ]);

      });

    });

});