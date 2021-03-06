'use strict';

let kParameter = 0;
let nParameter = 0;
let mParameter = 0;
let buckets = null;
let locationsBuffer = null;

const getLocations = v => {
  const hashValue1 = fnv_1a(v);
  const hashValue2 = fnv_1a_b(hashValue1);
  let x = hashValue1 % mParameter;
  for (var i = 0; i < kParameter; ++i) {
    locationsBuffer[i] = x < 0 ? (x + mParameter) : x;
    x = (x + hashValue2) % mParameter;
  }
  return locationsBuffer;
};

// < Lots of Fowler/Noll/Vo hash functions here.

const fnv_1a = v => {
  var a = 2166136261;
  for (var i = 0, n = v.length; i < n; ++i) {
    var c = v.charCodeAt(i),
        d = c & 0xff00;
    if (d) a = fnv_multiply(a ^ d >> 8);
    a = fnv_multiply(a ^ c & 0xff);
  }
  return fnv_mix(a);
}
const fnv_multiply = a => {
  return a + (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
}
const fnv_1a_b = a => {
  return fnv_mix(fnv_multiply(a));
}
const fnv_mix = a => {
  a += a << 13;
  a ^= a >>> 7;
  a += a << 3;
  a ^= a >>> 17;
  a += a << 5;
  return a & 0xffffffff;
}

// Lots of Fowler/Noll/Vo hash functions here. />

exports.init = (m, k) => {
  mParameter = m;
  kParameter = k;
  buckets = new Int32Array(Math.ceil(m / 32));

  const kbytes = 1 << Math.ceil(Math.log(Math.ceil(Math.log(m) / Math.LN2 / 8)) / Math.LN2);
  const array = kbytes === 1 ? Uint8Array : kbytes === 2 ? Uint16Array : Uint32Array;
  const kbuffer = new ArrayBuffer(kbytes * k);
  locationsBuffer = new array(kbuffer);
};

exports.add = value => {
  const locations = getLocations(value);
  for (var i = 0; i < kParameter; ++i) {
    buckets[Math.floor(locations[i] / 32)] |= 1 << (locations[i] % 32);
  }
};

exports.test = value => {
  const locations = getLocations(value);
  for (var i = 0; i < kParameter; ++i) {
    var location = locations[i];
    if ((buckets[Math.floor(location / 32)] & (1 << (location % 32))) === 0) {
      return false;
    }
  }
  return true;
};

exports.import = data => {
  buckets = new Int32Array(data);
};

exports.export = () => {
  return buckets;
};
