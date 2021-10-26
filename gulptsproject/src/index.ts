import { two } from "./two";
import { three } from "./three";

export function hello() {
  console.log("hello");
  two();
  three();
}

hello();
