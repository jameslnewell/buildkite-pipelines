import { MatrixObject } from "./MatrixObject";

export namespace Matrix {
  export interface Builder {
    build(): MatrixObject;
  }
}

export class Matrix {
  builder(): Matrix.Builder {
    return {
      build() {
        return [];
      },
    };
  }
}
