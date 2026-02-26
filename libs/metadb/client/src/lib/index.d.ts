
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MetaEntity
 * 
 */
export type MetaEntity = $Result.DefaultSelection<Prisma.$MetaEntityPayload>
/**
 * Model MetaAttribute
 * 
 */
export type MetaAttribute = $Result.DefaultSelection<Prisma.$MetaAttributePayload>
/**
 * Model MetaRecord
 * 
 */
export type MetaRecord = $Result.DefaultSelection<Prisma.$MetaRecordPayload>
/**
 * Model MetaValue
 * 
 */
export type MetaValue = $Result.DefaultSelection<Prisma.$MetaValuePayload>
/**
 * Model MetaRecordRelation
 * 
 */
export type MetaRecordRelation = $Result.DefaultSelection<Prisma.$MetaRecordRelationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AttributeType: {
  RELATION: 'RELATION',
  RELATION_MANY: 'RELATION_MANY',
  BOOLEAN: 'BOOLEAN',
  TINYINT: 'TINYINT',
  SMALLINT: 'SMALLINT',
  INT: 'INT',
  BIGINT: 'BIGINT',
  FLOAT: 'FLOAT',
  TIME: 'TIME',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  STRING: 'STRING',
  MEMO: 'MEMO',
  MEDIA: 'MEDIA',
  IMAGE: 'IMAGE',
  SELECT: 'SELECT',
  JSON: 'JSON',
  PARENT: 'PARENT',
  PARENT_MANY: 'PARENT_MANY',
  PARENT_COUNT: 'PARENT_COUNT'
};

export type AttributeType = (typeof AttributeType)[keyof typeof AttributeType]

}

export type AttributeType = $Enums.AttributeType

export const AttributeType: typeof $Enums.AttributeType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MetaEntities
 * const metaEntities = await prisma.metaEntity.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MetaEntities
   * const metaEntities = await prisma.metaEntity.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.metaEntity`: Exposes CRUD operations for the **MetaEntity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetaEntities
    * const metaEntities = await prisma.metaEntity.findMany()
    * ```
    */
  get metaEntity(): Prisma.MetaEntityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.metaAttribute`: Exposes CRUD operations for the **MetaAttribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetaAttributes
    * const metaAttributes = await prisma.metaAttribute.findMany()
    * ```
    */
  get metaAttribute(): Prisma.MetaAttributeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.metaRecord`: Exposes CRUD operations for the **MetaRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetaRecords
    * const metaRecords = await prisma.metaRecord.findMany()
    * ```
    */
  get metaRecord(): Prisma.MetaRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.metaValue`: Exposes CRUD operations for the **MetaValue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetaValues
    * const metaValues = await prisma.metaValue.findMany()
    * ```
    */
  get metaValue(): Prisma.MetaValueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.metaRecordRelation`: Exposes CRUD operations for the **MetaRecordRelation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetaRecordRelations
    * const metaRecordRelations = await prisma.metaRecordRelation.findMany()
    * ```
    */
  get metaRecordRelation(): Prisma.MetaRecordRelationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MetaEntity: 'MetaEntity',
    MetaAttribute: 'MetaAttribute',
    MetaRecord: 'MetaRecord',
    MetaValue: 'MetaValue',
    MetaRecordRelation: 'MetaRecordRelation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "metaEntity" | "metaAttribute" | "metaRecord" | "metaValue" | "metaRecordRelation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MetaEntity: {
        payload: Prisma.$MetaEntityPayload<ExtArgs>
        fields: Prisma.MetaEntityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetaEntityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetaEntityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload>
          }
          findFirst: {
            args: Prisma.MetaEntityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetaEntityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload>
          }
          findMany: {
            args: Prisma.MetaEntityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload>[]
          }
          create: {
            args: Prisma.MetaEntityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload>
          }
          createMany: {
            args: Prisma.MetaEntityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MetaEntityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload>[]
          }
          delete: {
            args: Prisma.MetaEntityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload>
          }
          update: {
            args: Prisma.MetaEntityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload>
          }
          deleteMany: {
            args: Prisma.MetaEntityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetaEntityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MetaEntityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload>[]
          }
          upsert: {
            args: Prisma.MetaEntityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaEntityPayload>
          }
          aggregate: {
            args: Prisma.MetaEntityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetaEntity>
          }
          groupBy: {
            args: Prisma.MetaEntityGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetaEntityGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetaEntityCountArgs<ExtArgs>
            result: $Utils.Optional<MetaEntityCountAggregateOutputType> | number
          }
        }
      }
      MetaAttribute: {
        payload: Prisma.$MetaAttributePayload<ExtArgs>
        fields: Prisma.MetaAttributeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetaAttributeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetaAttributeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload>
          }
          findFirst: {
            args: Prisma.MetaAttributeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetaAttributeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload>
          }
          findMany: {
            args: Prisma.MetaAttributeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload>[]
          }
          create: {
            args: Prisma.MetaAttributeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload>
          }
          createMany: {
            args: Prisma.MetaAttributeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MetaAttributeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload>[]
          }
          delete: {
            args: Prisma.MetaAttributeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload>
          }
          update: {
            args: Prisma.MetaAttributeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload>
          }
          deleteMany: {
            args: Prisma.MetaAttributeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetaAttributeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MetaAttributeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload>[]
          }
          upsert: {
            args: Prisma.MetaAttributeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaAttributePayload>
          }
          aggregate: {
            args: Prisma.MetaAttributeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetaAttribute>
          }
          groupBy: {
            args: Prisma.MetaAttributeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetaAttributeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetaAttributeCountArgs<ExtArgs>
            result: $Utils.Optional<MetaAttributeCountAggregateOutputType> | number
          }
        }
      }
      MetaRecord: {
        payload: Prisma.$MetaRecordPayload<ExtArgs>
        fields: Prisma.MetaRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetaRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetaRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload>
          }
          findFirst: {
            args: Prisma.MetaRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetaRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload>
          }
          findMany: {
            args: Prisma.MetaRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload>[]
          }
          create: {
            args: Prisma.MetaRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload>
          }
          createMany: {
            args: Prisma.MetaRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MetaRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload>[]
          }
          delete: {
            args: Prisma.MetaRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload>
          }
          update: {
            args: Prisma.MetaRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload>
          }
          deleteMany: {
            args: Prisma.MetaRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetaRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MetaRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload>[]
          }
          upsert: {
            args: Prisma.MetaRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordPayload>
          }
          aggregate: {
            args: Prisma.MetaRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetaRecord>
          }
          groupBy: {
            args: Prisma.MetaRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetaRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetaRecordCountArgs<ExtArgs>
            result: $Utils.Optional<MetaRecordCountAggregateOutputType> | number
          }
        }
      }
      MetaValue: {
        payload: Prisma.$MetaValuePayload<ExtArgs>
        fields: Prisma.MetaValueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetaValueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetaValueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload>
          }
          findFirst: {
            args: Prisma.MetaValueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetaValueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload>
          }
          findMany: {
            args: Prisma.MetaValueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload>[]
          }
          create: {
            args: Prisma.MetaValueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload>
          }
          createMany: {
            args: Prisma.MetaValueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MetaValueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload>[]
          }
          delete: {
            args: Prisma.MetaValueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload>
          }
          update: {
            args: Prisma.MetaValueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload>
          }
          deleteMany: {
            args: Prisma.MetaValueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetaValueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MetaValueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload>[]
          }
          upsert: {
            args: Prisma.MetaValueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaValuePayload>
          }
          aggregate: {
            args: Prisma.MetaValueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetaValue>
          }
          groupBy: {
            args: Prisma.MetaValueGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetaValueGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetaValueCountArgs<ExtArgs>
            result: $Utils.Optional<MetaValueCountAggregateOutputType> | number
          }
        }
      }
      MetaRecordRelation: {
        payload: Prisma.$MetaRecordRelationPayload<ExtArgs>
        fields: Prisma.MetaRecordRelationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetaRecordRelationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetaRecordRelationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload>
          }
          findFirst: {
            args: Prisma.MetaRecordRelationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetaRecordRelationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload>
          }
          findMany: {
            args: Prisma.MetaRecordRelationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload>[]
          }
          create: {
            args: Prisma.MetaRecordRelationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload>
          }
          createMany: {
            args: Prisma.MetaRecordRelationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MetaRecordRelationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload>[]
          }
          delete: {
            args: Prisma.MetaRecordRelationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload>
          }
          update: {
            args: Prisma.MetaRecordRelationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload>
          }
          deleteMany: {
            args: Prisma.MetaRecordRelationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetaRecordRelationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MetaRecordRelationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload>[]
          }
          upsert: {
            args: Prisma.MetaRecordRelationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaRecordRelationPayload>
          }
          aggregate: {
            args: Prisma.MetaRecordRelationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetaRecordRelation>
          }
          groupBy: {
            args: Prisma.MetaRecordRelationGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetaRecordRelationGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetaRecordRelationCountArgs<ExtArgs>
            result: $Utils.Optional<MetaRecordRelationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    metaEntity?: MetaEntityOmit
    metaAttribute?: MetaAttributeOmit
    metaRecord?: MetaRecordOmit
    metaValue?: MetaValueOmit
    metaRecordRelation?: MetaRecordRelationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MetaEntityCountOutputType
   */

  export type MetaEntityCountOutputType = {
    relations: number
    records: number
    children: number
  }

  export type MetaEntityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    relations?: boolean | MetaEntityCountOutputTypeCountRelationsArgs
    records?: boolean | MetaEntityCountOutputTypeCountRecordsArgs
    children?: boolean | MetaEntityCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * MetaEntityCountOutputType without action
   */
  export type MetaEntityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntityCountOutputType
     */
    select?: MetaEntityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MetaEntityCountOutputType without action
   */
  export type MetaEntityCountOutputTypeCountRelationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaAttributeWhereInput
  }

  /**
   * MetaEntityCountOutputType without action
   */
  export type MetaEntityCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaRecordWhereInput
  }

  /**
   * MetaEntityCountOutputType without action
   */
  export type MetaEntityCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaAttributeWhereInput
  }


  /**
   * Count Type MetaAttributeCountOutputType
   */

  export type MetaAttributeCountOutputType = {
    values: number
  }

  export type MetaAttributeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    values?: boolean | MetaAttributeCountOutputTypeCountValuesArgs
  }

  // Custom InputTypes
  /**
   * MetaAttributeCountOutputType without action
   */
  export type MetaAttributeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttributeCountOutputType
     */
    select?: MetaAttributeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MetaAttributeCountOutputType without action
   */
  export type MetaAttributeCountOutputTypeCountValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaValueWhereInput
  }


  /**
   * Count Type MetaRecordCountOutputType
   */

  export type MetaRecordCountOutputType = {
    parent: number
    value: number
  }

  export type MetaRecordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | MetaRecordCountOutputTypeCountParentArgs
    value?: boolean | MetaRecordCountOutputTypeCountValueArgs
  }

  // Custom InputTypes
  /**
   * MetaRecordCountOutputType without action
   */
  export type MetaRecordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordCountOutputType
     */
    select?: MetaRecordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MetaRecordCountOutputType without action
   */
  export type MetaRecordCountOutputTypeCountParentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaRecordRelationWhereInput
  }

  /**
   * MetaRecordCountOutputType without action
   */
  export type MetaRecordCountOutputTypeCountValueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaValueWhereInput
  }


  /**
   * Count Type MetaValueCountOutputType
   */

  export type MetaValueCountOutputType = {
    children: number
  }

  export type MetaValueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | MetaValueCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * MetaValueCountOutputType without action
   */
  export type MetaValueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValueCountOutputType
     */
    select?: MetaValueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MetaValueCountOutputType without action
   */
  export type MetaValueCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaRecordRelationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MetaEntity
   */

  export type AggregateMetaEntity = {
    _count: MetaEntityCountAggregateOutputType | null
    _avg: MetaEntityAvgAggregateOutputType | null
    _sum: MetaEntitySumAggregateOutputType | null
    _min: MetaEntityMinAggregateOutputType | null
    _max: MetaEntityMaxAggregateOutputType | null
  }

  export type MetaEntityAvgAggregateOutputType = {
    order: number | null
  }

  export type MetaEntitySumAggregateOutputType = {
    order: number | null
  }

  export type MetaEntityMinAggregateOutputType = {
    id: string | null
    name: string | null
    title: string | null
    description: string | null
    readonly: boolean | null
    type: string | null
    hidden: boolean | null
    order: number | null
    roleable: boolean | null
    disable: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MetaEntityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    title: string | null
    description: string | null
    readonly: boolean | null
    type: string | null
    hidden: boolean | null
    order: number | null
    roleable: boolean | null
    disable: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MetaEntityCountAggregateOutputType = {
    id: number
    name: number
    title: number
    description: number
    readonly: number
    type: number
    hidden: number
    order: number
    roleable: number
    disable: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MetaEntityAvgAggregateInputType = {
    order?: true
  }

  export type MetaEntitySumAggregateInputType = {
    order?: true
  }

  export type MetaEntityMinAggregateInputType = {
    id?: true
    name?: true
    title?: true
    description?: true
    readonly?: true
    type?: true
    hidden?: true
    order?: true
    roleable?: true
    disable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MetaEntityMaxAggregateInputType = {
    id?: true
    name?: true
    title?: true
    description?: true
    readonly?: true
    type?: true
    hidden?: true
    order?: true
    roleable?: true
    disable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MetaEntityCountAggregateInputType = {
    id?: true
    name?: true
    title?: true
    description?: true
    readonly?: true
    type?: true
    hidden?: true
    order?: true
    roleable?: true
    disable?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MetaEntityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaEntity to aggregate.
     */
    where?: MetaEntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaEntities to fetch.
     */
    orderBy?: MetaEntityOrderByWithRelationInput | MetaEntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetaEntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaEntities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaEntities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetaEntities
    **/
    _count?: true | MetaEntityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MetaEntityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MetaEntitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetaEntityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetaEntityMaxAggregateInputType
  }

  export type GetMetaEntityAggregateType<T extends MetaEntityAggregateArgs> = {
        [P in keyof T & keyof AggregateMetaEntity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetaEntity[P]>
      : GetScalarType<T[P], AggregateMetaEntity[P]>
  }




  export type MetaEntityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaEntityWhereInput
    orderBy?: MetaEntityOrderByWithAggregationInput | MetaEntityOrderByWithAggregationInput[]
    by: MetaEntityScalarFieldEnum[] | MetaEntityScalarFieldEnum
    having?: MetaEntityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetaEntityCountAggregateInputType | true
    _avg?: MetaEntityAvgAggregateInputType
    _sum?: MetaEntitySumAggregateInputType
    _min?: MetaEntityMinAggregateInputType
    _max?: MetaEntityMaxAggregateInputType
  }

  export type MetaEntityGroupByOutputType = {
    id: string
    name: string | null
    title: string | null
    description: string | null
    readonly: boolean | null
    type: string | null
    hidden: boolean | null
    order: number | null
    roleable: boolean | null
    disable: boolean | null
    createdAt: Date
    updatedAt: Date
    _count: MetaEntityCountAggregateOutputType | null
    _avg: MetaEntityAvgAggregateOutputType | null
    _sum: MetaEntitySumAggregateOutputType | null
    _min: MetaEntityMinAggregateOutputType | null
    _max: MetaEntityMaxAggregateOutputType | null
  }

  type GetMetaEntityGroupByPayload<T extends MetaEntityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetaEntityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetaEntityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetaEntityGroupByOutputType[P]>
            : GetScalarType<T[P], MetaEntityGroupByOutputType[P]>
        }
      >
    >


  export type MetaEntitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    description?: boolean
    readonly?: boolean
    type?: boolean
    hidden?: boolean
    order?: boolean
    roleable?: boolean
    disable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    relations?: boolean | MetaEntity$relationsArgs<ExtArgs>
    records?: boolean | MetaEntity$recordsArgs<ExtArgs>
    children?: boolean | MetaEntity$childrenArgs<ExtArgs>
    _count?: boolean | MetaEntityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metaEntity"]>

  export type MetaEntitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    description?: boolean
    readonly?: boolean
    type?: boolean
    hidden?: boolean
    order?: boolean
    roleable?: boolean
    disable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["metaEntity"]>

  export type MetaEntitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    description?: boolean
    readonly?: boolean
    type?: boolean
    hidden?: boolean
    order?: boolean
    roleable?: boolean
    disable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["metaEntity"]>

  export type MetaEntitySelectScalar = {
    id?: boolean
    name?: boolean
    title?: boolean
    description?: boolean
    readonly?: boolean
    type?: boolean
    hidden?: boolean
    order?: boolean
    roleable?: boolean
    disable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MetaEntityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "title" | "description" | "readonly" | "type" | "hidden" | "order" | "roleable" | "disable" | "createdAt" | "updatedAt", ExtArgs["result"]["metaEntity"]>
  export type MetaEntityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    relations?: boolean | MetaEntity$relationsArgs<ExtArgs>
    records?: boolean | MetaEntity$recordsArgs<ExtArgs>
    children?: boolean | MetaEntity$childrenArgs<ExtArgs>
    _count?: boolean | MetaEntityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MetaEntityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MetaEntityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MetaEntityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetaEntity"
    objects: {
      relations: Prisma.$MetaAttributePayload<ExtArgs>[]
      records: Prisma.$MetaRecordPayload<ExtArgs>[]
      children: Prisma.$MetaAttributePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string | null
      name: string | null
      title: string | null
      description: string | null
      readonly: boolean | null
      type: string | null
      hidden: boolean | null
      order: number | null
      roleable: boolean | null
      disable: boolean | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["metaEntity"]>
    composites: {}
  }

  type MetaEntityGetPayload<S extends boolean | null | undefined | MetaEntityDefaultArgs> = $Result.GetResult<Prisma.$MetaEntityPayload, S>

  type MetaEntityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MetaEntityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MetaEntityCountAggregateInputType | true
    }

  export interface MetaEntityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetaEntity'], meta: { name: 'MetaEntity' } }
    /**
     * Find zero or one MetaEntity that matches the filter.
     * @param {MetaEntityFindUniqueArgs} args - Arguments to find a MetaEntity
     * @example
     * // Get one MetaEntity
     * const metaEntity = await prisma.metaEntity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetaEntityFindUniqueArgs>(args: SelectSubset<T, MetaEntityFindUniqueArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MetaEntity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MetaEntityFindUniqueOrThrowArgs} args - Arguments to find a MetaEntity
     * @example
     * // Get one MetaEntity
     * const metaEntity = await prisma.metaEntity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetaEntityFindUniqueOrThrowArgs>(args: SelectSubset<T, MetaEntityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaEntity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaEntityFindFirstArgs} args - Arguments to find a MetaEntity
     * @example
     * // Get one MetaEntity
     * const metaEntity = await prisma.metaEntity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetaEntityFindFirstArgs>(args?: SelectSubset<T, MetaEntityFindFirstArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaEntity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaEntityFindFirstOrThrowArgs} args - Arguments to find a MetaEntity
     * @example
     * // Get one MetaEntity
     * const metaEntity = await prisma.metaEntity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetaEntityFindFirstOrThrowArgs>(args?: SelectSubset<T, MetaEntityFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MetaEntities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaEntityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetaEntities
     * const metaEntities = await prisma.metaEntity.findMany()
     * 
     * // Get first 10 MetaEntities
     * const metaEntities = await prisma.metaEntity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const metaEntityWithIdOnly = await prisma.metaEntity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MetaEntityFindManyArgs>(args?: SelectSubset<T, MetaEntityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MetaEntity.
     * @param {MetaEntityCreateArgs} args - Arguments to create a MetaEntity.
     * @example
     * // Create one MetaEntity
     * const MetaEntity = await prisma.metaEntity.create({
     *   data: {
     *     // ... data to create a MetaEntity
     *   }
     * })
     * 
     */
    create<T extends MetaEntityCreateArgs>(args: SelectSubset<T, MetaEntityCreateArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MetaEntities.
     * @param {MetaEntityCreateManyArgs} args - Arguments to create many MetaEntities.
     * @example
     * // Create many MetaEntities
     * const metaEntity = await prisma.metaEntity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetaEntityCreateManyArgs>(args?: SelectSubset<T, MetaEntityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MetaEntities and returns the data saved in the database.
     * @param {MetaEntityCreateManyAndReturnArgs} args - Arguments to create many MetaEntities.
     * @example
     * // Create many MetaEntities
     * const metaEntity = await prisma.metaEntity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MetaEntities and only return the `id`
     * const metaEntityWithIdOnly = await prisma.metaEntity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MetaEntityCreateManyAndReturnArgs>(args?: SelectSubset<T, MetaEntityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MetaEntity.
     * @param {MetaEntityDeleteArgs} args - Arguments to delete one MetaEntity.
     * @example
     * // Delete one MetaEntity
     * const MetaEntity = await prisma.metaEntity.delete({
     *   where: {
     *     // ... filter to delete one MetaEntity
     *   }
     * })
     * 
     */
    delete<T extends MetaEntityDeleteArgs>(args: SelectSubset<T, MetaEntityDeleteArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MetaEntity.
     * @param {MetaEntityUpdateArgs} args - Arguments to update one MetaEntity.
     * @example
     * // Update one MetaEntity
     * const metaEntity = await prisma.metaEntity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetaEntityUpdateArgs>(args: SelectSubset<T, MetaEntityUpdateArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MetaEntities.
     * @param {MetaEntityDeleteManyArgs} args - Arguments to filter MetaEntities to delete.
     * @example
     * // Delete a few MetaEntities
     * const { count } = await prisma.metaEntity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetaEntityDeleteManyArgs>(args?: SelectSubset<T, MetaEntityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaEntities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaEntityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetaEntities
     * const metaEntity = await prisma.metaEntity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetaEntityUpdateManyArgs>(args: SelectSubset<T, MetaEntityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaEntities and returns the data updated in the database.
     * @param {MetaEntityUpdateManyAndReturnArgs} args - Arguments to update many MetaEntities.
     * @example
     * // Update many MetaEntities
     * const metaEntity = await prisma.metaEntity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MetaEntities and only return the `id`
     * const metaEntityWithIdOnly = await prisma.metaEntity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MetaEntityUpdateManyAndReturnArgs>(args: SelectSubset<T, MetaEntityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MetaEntity.
     * @param {MetaEntityUpsertArgs} args - Arguments to update or create a MetaEntity.
     * @example
     * // Update or create a MetaEntity
     * const metaEntity = await prisma.metaEntity.upsert({
     *   create: {
     *     // ... data to create a MetaEntity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetaEntity we want to update
     *   }
     * })
     */
    upsert<T extends MetaEntityUpsertArgs>(args: SelectSubset<T, MetaEntityUpsertArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MetaEntities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaEntityCountArgs} args - Arguments to filter MetaEntities to count.
     * @example
     * // Count the number of MetaEntities
     * const count = await prisma.metaEntity.count({
     *   where: {
     *     // ... the filter for the MetaEntities we want to count
     *   }
     * })
    **/
    count<T extends MetaEntityCountArgs>(
      args?: Subset<T, MetaEntityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetaEntityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetaEntity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaEntityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetaEntityAggregateArgs>(args: Subset<T, MetaEntityAggregateArgs>): Prisma.PrismaPromise<GetMetaEntityAggregateType<T>>

    /**
     * Group by MetaEntity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaEntityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetaEntityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetaEntityGroupByArgs['orderBy'] }
        : { orderBy?: MetaEntityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetaEntityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetaEntityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetaEntity model
   */
  readonly fields: MetaEntityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetaEntity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetaEntityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    relations<T extends MetaEntity$relationsArgs<ExtArgs> = {}>(args?: Subset<T, MetaEntity$relationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    records<T extends MetaEntity$recordsArgs<ExtArgs> = {}>(args?: Subset<T, MetaEntity$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    children<T extends MetaEntity$childrenArgs<ExtArgs> = {}>(args?: Subset<T, MetaEntity$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MetaEntity model
   */
  interface MetaEntityFieldRefs {
    readonly id: FieldRef<"MetaEntity", 'String'>
    readonly name: FieldRef<"MetaEntity", 'String'>
    readonly title: FieldRef<"MetaEntity", 'String'>
    readonly description: FieldRef<"MetaEntity", 'String'>
    readonly readonly: FieldRef<"MetaEntity", 'Boolean'>
    readonly type: FieldRef<"MetaEntity", 'String'>
    readonly hidden: FieldRef<"MetaEntity", 'Boolean'>
    readonly order: FieldRef<"MetaEntity", 'Int'>
    readonly roleable: FieldRef<"MetaEntity", 'Boolean'>
    readonly disable: FieldRef<"MetaEntity", 'Boolean'>
    readonly createdAt: FieldRef<"MetaEntity", 'DateTime'>
    readonly updatedAt: FieldRef<"MetaEntity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MetaEntity findUnique
   */
  export type MetaEntityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    /**
     * Filter, which MetaEntity to fetch.
     */
    where: MetaEntityWhereUniqueInput
  }

  /**
   * MetaEntity findUniqueOrThrow
   */
  export type MetaEntityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    /**
     * Filter, which MetaEntity to fetch.
     */
    where: MetaEntityWhereUniqueInput
  }

  /**
   * MetaEntity findFirst
   */
  export type MetaEntityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    /**
     * Filter, which MetaEntity to fetch.
     */
    where?: MetaEntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaEntities to fetch.
     */
    orderBy?: MetaEntityOrderByWithRelationInput | MetaEntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaEntities.
     */
    cursor?: MetaEntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaEntities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaEntities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaEntities.
     */
    distinct?: MetaEntityScalarFieldEnum | MetaEntityScalarFieldEnum[]
  }

  /**
   * MetaEntity findFirstOrThrow
   */
  export type MetaEntityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    /**
     * Filter, which MetaEntity to fetch.
     */
    where?: MetaEntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaEntities to fetch.
     */
    orderBy?: MetaEntityOrderByWithRelationInput | MetaEntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaEntities.
     */
    cursor?: MetaEntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaEntities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaEntities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaEntities.
     */
    distinct?: MetaEntityScalarFieldEnum | MetaEntityScalarFieldEnum[]
  }

  /**
   * MetaEntity findMany
   */
  export type MetaEntityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    /**
     * Filter, which MetaEntities to fetch.
     */
    where?: MetaEntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaEntities to fetch.
     */
    orderBy?: MetaEntityOrderByWithRelationInput | MetaEntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetaEntities.
     */
    cursor?: MetaEntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaEntities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaEntities.
     */
    skip?: number
    distinct?: MetaEntityScalarFieldEnum | MetaEntityScalarFieldEnum[]
  }

  /**
   * MetaEntity create
   */
  export type MetaEntityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    /**
     * The data needed to create a MetaEntity.
     */
    data: XOR<MetaEntityCreateInput, MetaEntityUncheckedCreateInput>
  }

  /**
   * MetaEntity createMany
   */
  export type MetaEntityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetaEntities.
     */
    data: MetaEntityCreateManyInput | MetaEntityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetaEntity createManyAndReturn
   */
  export type MetaEntityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * The data used to create many MetaEntities.
     */
    data: MetaEntityCreateManyInput | MetaEntityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetaEntity update
   */
  export type MetaEntityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    /**
     * The data needed to update a MetaEntity.
     */
    data: XOR<MetaEntityUpdateInput, MetaEntityUncheckedUpdateInput>
    /**
     * Choose, which MetaEntity to update.
     */
    where: MetaEntityWhereUniqueInput
  }

  /**
   * MetaEntity updateMany
   */
  export type MetaEntityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetaEntities.
     */
    data: XOR<MetaEntityUpdateManyMutationInput, MetaEntityUncheckedUpdateManyInput>
    /**
     * Filter which MetaEntities to update
     */
    where?: MetaEntityWhereInput
    /**
     * Limit how many MetaEntities to update.
     */
    limit?: number
  }

  /**
   * MetaEntity updateManyAndReturn
   */
  export type MetaEntityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * The data used to update MetaEntities.
     */
    data: XOR<MetaEntityUpdateManyMutationInput, MetaEntityUncheckedUpdateManyInput>
    /**
     * Filter which MetaEntities to update
     */
    where?: MetaEntityWhereInput
    /**
     * Limit how many MetaEntities to update.
     */
    limit?: number
  }

  /**
   * MetaEntity upsert
   */
  export type MetaEntityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    /**
     * The filter to search for the MetaEntity to update in case it exists.
     */
    where: MetaEntityWhereUniqueInput
    /**
     * In case the MetaEntity found by the `where` argument doesn't exist, create a new MetaEntity with this data.
     */
    create: XOR<MetaEntityCreateInput, MetaEntityUncheckedCreateInput>
    /**
     * In case the MetaEntity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetaEntityUpdateInput, MetaEntityUncheckedUpdateInput>
  }

  /**
   * MetaEntity delete
   */
  export type MetaEntityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    /**
     * Filter which MetaEntity to delete.
     */
    where: MetaEntityWhereUniqueInput
  }

  /**
   * MetaEntity deleteMany
   */
  export type MetaEntityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaEntities to delete
     */
    where?: MetaEntityWhereInput
    /**
     * Limit how many MetaEntities to delete.
     */
    limit?: number
  }

  /**
   * MetaEntity.relations
   */
  export type MetaEntity$relationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    where?: MetaAttributeWhereInput
    orderBy?: MetaAttributeOrderByWithRelationInput | MetaAttributeOrderByWithRelationInput[]
    cursor?: MetaAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MetaAttributeScalarFieldEnum | MetaAttributeScalarFieldEnum[]
  }

  /**
   * MetaEntity.records
   */
  export type MetaEntity$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    where?: MetaRecordWhereInput
    orderBy?: MetaRecordOrderByWithRelationInput | MetaRecordOrderByWithRelationInput[]
    cursor?: MetaRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MetaRecordScalarFieldEnum | MetaRecordScalarFieldEnum[]
  }

  /**
   * MetaEntity.children
   */
  export type MetaEntity$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    where?: MetaAttributeWhereInput
    orderBy?: MetaAttributeOrderByWithRelationInput | MetaAttributeOrderByWithRelationInput[]
    cursor?: MetaAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MetaAttributeScalarFieldEnum | MetaAttributeScalarFieldEnum[]
  }

  /**
   * MetaEntity without action
   */
  export type MetaEntityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
  }


  /**
   * Model MetaAttribute
   */

  export type AggregateMetaAttribute = {
    _count: MetaAttributeCountAggregateOutputType | null
    _avg: MetaAttributeAvgAggregateOutputType | null
    _sum: MetaAttributeSumAggregateOutputType | null
    _min: MetaAttributeMinAggregateOutputType | null
    _max: MetaAttributeMaxAggregateOutputType | null
  }

  export type MetaAttributeAvgAggregateOutputType = {
    order: number | null
    role: number | null
  }

  export type MetaAttributeSumAggregateOutputType = {
    order: number | null
    role: number | null
  }

  export type MetaAttributeMinAggregateOutputType = {
    id: string | null
    title: string | null
    name: string | null
    description: string | null
    multiple: boolean | null
    type: string | null
    required: boolean | null
    readonly: boolean | null
    order: number | null
    disable: boolean | null
    hash: string | null
    default: string | null
    role: number | null
    security: boolean | null
    field: string | null
    entityId: string | null
    relationId: string | null
    relationName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MetaAttributeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    name: string | null
    description: string | null
    multiple: boolean | null
    type: string | null
    required: boolean | null
    readonly: boolean | null
    order: number | null
    disable: boolean | null
    hash: string | null
    default: string | null
    role: number | null
    security: boolean | null
    field: string | null
    entityId: string | null
    relationId: string | null
    relationName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MetaAttributeCountAggregateOutputType = {
    id: number
    title: number
    name: number
    description: number
    multiple: number
    type: number
    required: number
    readonly: number
    order: number
    disable: number
    hash: number
    default: number
    role: number
    security: number
    field: number
    entityId: number
    relationId: number
    relationName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MetaAttributeAvgAggregateInputType = {
    order?: true
    role?: true
  }

  export type MetaAttributeSumAggregateInputType = {
    order?: true
    role?: true
  }

  export type MetaAttributeMinAggregateInputType = {
    id?: true
    title?: true
    name?: true
    description?: true
    multiple?: true
    type?: true
    required?: true
    readonly?: true
    order?: true
    disable?: true
    hash?: true
    default?: true
    role?: true
    security?: true
    field?: true
    entityId?: true
    relationId?: true
    relationName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MetaAttributeMaxAggregateInputType = {
    id?: true
    title?: true
    name?: true
    description?: true
    multiple?: true
    type?: true
    required?: true
    readonly?: true
    order?: true
    disable?: true
    hash?: true
    default?: true
    role?: true
    security?: true
    field?: true
    entityId?: true
    relationId?: true
    relationName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MetaAttributeCountAggregateInputType = {
    id?: true
    title?: true
    name?: true
    description?: true
    multiple?: true
    type?: true
    required?: true
    readonly?: true
    order?: true
    disable?: true
    hash?: true
    default?: true
    role?: true
    security?: true
    field?: true
    entityId?: true
    relationId?: true
    relationName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MetaAttributeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaAttribute to aggregate.
     */
    where?: MetaAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaAttributes to fetch.
     */
    orderBy?: MetaAttributeOrderByWithRelationInput | MetaAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetaAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetaAttributes
    **/
    _count?: true | MetaAttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MetaAttributeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MetaAttributeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetaAttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetaAttributeMaxAggregateInputType
  }

  export type GetMetaAttributeAggregateType<T extends MetaAttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateMetaAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetaAttribute[P]>
      : GetScalarType<T[P], AggregateMetaAttribute[P]>
  }




  export type MetaAttributeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaAttributeWhereInput
    orderBy?: MetaAttributeOrderByWithAggregationInput | MetaAttributeOrderByWithAggregationInput[]
    by: MetaAttributeScalarFieldEnum[] | MetaAttributeScalarFieldEnum
    having?: MetaAttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetaAttributeCountAggregateInputType | true
    _avg?: MetaAttributeAvgAggregateInputType
    _sum?: MetaAttributeSumAggregateInputType
    _min?: MetaAttributeMinAggregateInputType
    _max?: MetaAttributeMaxAggregateInputType
  }

  export type MetaAttributeGroupByOutputType = {
    id: string
    title: string | null
    name: string
    description: string | null
    multiple: boolean | null
    type: string | null
    required: boolean | null
    readonly: boolean | null
    order: number | null
    disable: boolean | null
    hash: string | null
    default: string | null
    role: number | null
    security: boolean | null
    field: string | null
    entityId: string | null
    relationId: string | null
    relationName: string | null
    createdAt: Date
    updatedAt: Date
    _count: MetaAttributeCountAggregateOutputType | null
    _avg: MetaAttributeAvgAggregateOutputType | null
    _sum: MetaAttributeSumAggregateOutputType | null
    _min: MetaAttributeMinAggregateOutputType | null
    _max: MetaAttributeMaxAggregateOutputType | null
  }

  type GetMetaAttributeGroupByPayload<T extends MetaAttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetaAttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetaAttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetaAttributeGroupByOutputType[P]>
            : GetScalarType<T[P], MetaAttributeGroupByOutputType[P]>
        }
      >
    >


  export type MetaAttributeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    name?: boolean
    description?: boolean
    multiple?: boolean
    type?: boolean
    required?: boolean
    readonly?: boolean
    order?: boolean
    disable?: boolean
    hash?: boolean
    default?: boolean
    role?: boolean
    security?: boolean
    field?: boolean
    entityId?: boolean
    relationId?: boolean
    relationName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    values?: boolean | MetaAttribute$valuesArgs<ExtArgs>
    entity?: boolean | MetaAttribute$entityArgs<ExtArgs>
    relation?: boolean | MetaAttribute$relationArgs<ExtArgs>
    _count?: boolean | MetaAttributeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metaAttribute"]>

  export type MetaAttributeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    name?: boolean
    description?: boolean
    multiple?: boolean
    type?: boolean
    required?: boolean
    readonly?: boolean
    order?: boolean
    disable?: boolean
    hash?: boolean
    default?: boolean
    role?: boolean
    security?: boolean
    field?: boolean
    entityId?: boolean
    relationId?: boolean
    relationName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entity?: boolean | MetaAttribute$entityArgs<ExtArgs>
    relation?: boolean | MetaAttribute$relationArgs<ExtArgs>
  }, ExtArgs["result"]["metaAttribute"]>

  export type MetaAttributeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    name?: boolean
    description?: boolean
    multiple?: boolean
    type?: boolean
    required?: boolean
    readonly?: boolean
    order?: boolean
    disable?: boolean
    hash?: boolean
    default?: boolean
    role?: boolean
    security?: boolean
    field?: boolean
    entityId?: boolean
    relationId?: boolean
    relationName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entity?: boolean | MetaAttribute$entityArgs<ExtArgs>
    relation?: boolean | MetaAttribute$relationArgs<ExtArgs>
  }, ExtArgs["result"]["metaAttribute"]>

  export type MetaAttributeSelectScalar = {
    id?: boolean
    title?: boolean
    name?: boolean
    description?: boolean
    multiple?: boolean
    type?: boolean
    required?: boolean
    readonly?: boolean
    order?: boolean
    disable?: boolean
    hash?: boolean
    default?: boolean
    role?: boolean
    security?: boolean
    field?: boolean
    entityId?: boolean
    relationId?: boolean
    relationName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MetaAttributeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "name" | "description" | "multiple" | "type" | "required" | "readonly" | "order" | "disable" | "hash" | "default" | "role" | "security" | "field" | "entityId" | "relationId" | "relationName" | "createdAt" | "updatedAt", ExtArgs["result"]["metaAttribute"]>
  export type MetaAttributeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    values?: boolean | MetaAttribute$valuesArgs<ExtArgs>
    entity?: boolean | MetaAttribute$entityArgs<ExtArgs>
    relation?: boolean | MetaAttribute$relationArgs<ExtArgs>
    _count?: boolean | MetaAttributeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MetaAttributeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entity?: boolean | MetaAttribute$entityArgs<ExtArgs>
    relation?: boolean | MetaAttribute$relationArgs<ExtArgs>
  }
  export type MetaAttributeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entity?: boolean | MetaAttribute$entityArgs<ExtArgs>
    relation?: boolean | MetaAttribute$relationArgs<ExtArgs>
  }

  export type $MetaAttributePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetaAttribute"
    objects: {
      values: Prisma.$MetaValuePayload<ExtArgs>[]
      entity: Prisma.$MetaEntityPayload<ExtArgs> | null
      relation: Prisma.$MetaEntityPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string | null
      name: string
      description: string | null
      multiple: boolean | null
      type: string | null
      required: boolean | null
      readonly: boolean | null
      order: number | null
      disable: boolean | null
      hash: string | null
      default: string | null
      role: number | null
      security: boolean | null
      field: string | null
      entityId: string | null
      relationId: string | null
      relationName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["metaAttribute"]>
    composites: {}
  }

  type MetaAttributeGetPayload<S extends boolean | null | undefined | MetaAttributeDefaultArgs> = $Result.GetResult<Prisma.$MetaAttributePayload, S>

  type MetaAttributeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MetaAttributeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MetaAttributeCountAggregateInputType | true
    }

  export interface MetaAttributeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetaAttribute'], meta: { name: 'MetaAttribute' } }
    /**
     * Find zero or one MetaAttribute that matches the filter.
     * @param {MetaAttributeFindUniqueArgs} args - Arguments to find a MetaAttribute
     * @example
     * // Get one MetaAttribute
     * const metaAttribute = await prisma.metaAttribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetaAttributeFindUniqueArgs>(args: SelectSubset<T, MetaAttributeFindUniqueArgs<ExtArgs>>): Prisma__MetaAttributeClient<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MetaAttribute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MetaAttributeFindUniqueOrThrowArgs} args - Arguments to find a MetaAttribute
     * @example
     * // Get one MetaAttribute
     * const metaAttribute = await prisma.metaAttribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetaAttributeFindUniqueOrThrowArgs>(args: SelectSubset<T, MetaAttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetaAttributeClient<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaAttribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaAttributeFindFirstArgs} args - Arguments to find a MetaAttribute
     * @example
     * // Get one MetaAttribute
     * const metaAttribute = await prisma.metaAttribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetaAttributeFindFirstArgs>(args?: SelectSubset<T, MetaAttributeFindFirstArgs<ExtArgs>>): Prisma__MetaAttributeClient<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaAttribute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaAttributeFindFirstOrThrowArgs} args - Arguments to find a MetaAttribute
     * @example
     * // Get one MetaAttribute
     * const metaAttribute = await prisma.metaAttribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetaAttributeFindFirstOrThrowArgs>(args?: SelectSubset<T, MetaAttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetaAttributeClient<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MetaAttributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaAttributeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetaAttributes
     * const metaAttributes = await prisma.metaAttribute.findMany()
     * 
     * // Get first 10 MetaAttributes
     * const metaAttributes = await prisma.metaAttribute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const metaAttributeWithIdOnly = await prisma.metaAttribute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MetaAttributeFindManyArgs>(args?: SelectSubset<T, MetaAttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MetaAttribute.
     * @param {MetaAttributeCreateArgs} args - Arguments to create a MetaAttribute.
     * @example
     * // Create one MetaAttribute
     * const MetaAttribute = await prisma.metaAttribute.create({
     *   data: {
     *     // ... data to create a MetaAttribute
     *   }
     * })
     * 
     */
    create<T extends MetaAttributeCreateArgs>(args: SelectSubset<T, MetaAttributeCreateArgs<ExtArgs>>): Prisma__MetaAttributeClient<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MetaAttributes.
     * @param {MetaAttributeCreateManyArgs} args - Arguments to create many MetaAttributes.
     * @example
     * // Create many MetaAttributes
     * const metaAttribute = await prisma.metaAttribute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetaAttributeCreateManyArgs>(args?: SelectSubset<T, MetaAttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MetaAttributes and returns the data saved in the database.
     * @param {MetaAttributeCreateManyAndReturnArgs} args - Arguments to create many MetaAttributes.
     * @example
     * // Create many MetaAttributes
     * const metaAttribute = await prisma.metaAttribute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MetaAttributes and only return the `id`
     * const metaAttributeWithIdOnly = await prisma.metaAttribute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MetaAttributeCreateManyAndReturnArgs>(args?: SelectSubset<T, MetaAttributeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MetaAttribute.
     * @param {MetaAttributeDeleteArgs} args - Arguments to delete one MetaAttribute.
     * @example
     * // Delete one MetaAttribute
     * const MetaAttribute = await prisma.metaAttribute.delete({
     *   where: {
     *     // ... filter to delete one MetaAttribute
     *   }
     * })
     * 
     */
    delete<T extends MetaAttributeDeleteArgs>(args: SelectSubset<T, MetaAttributeDeleteArgs<ExtArgs>>): Prisma__MetaAttributeClient<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MetaAttribute.
     * @param {MetaAttributeUpdateArgs} args - Arguments to update one MetaAttribute.
     * @example
     * // Update one MetaAttribute
     * const metaAttribute = await prisma.metaAttribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetaAttributeUpdateArgs>(args: SelectSubset<T, MetaAttributeUpdateArgs<ExtArgs>>): Prisma__MetaAttributeClient<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MetaAttributes.
     * @param {MetaAttributeDeleteManyArgs} args - Arguments to filter MetaAttributes to delete.
     * @example
     * // Delete a few MetaAttributes
     * const { count } = await prisma.metaAttribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetaAttributeDeleteManyArgs>(args?: SelectSubset<T, MetaAttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaAttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetaAttributes
     * const metaAttribute = await prisma.metaAttribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetaAttributeUpdateManyArgs>(args: SelectSubset<T, MetaAttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaAttributes and returns the data updated in the database.
     * @param {MetaAttributeUpdateManyAndReturnArgs} args - Arguments to update many MetaAttributes.
     * @example
     * // Update many MetaAttributes
     * const metaAttribute = await prisma.metaAttribute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MetaAttributes and only return the `id`
     * const metaAttributeWithIdOnly = await prisma.metaAttribute.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MetaAttributeUpdateManyAndReturnArgs>(args: SelectSubset<T, MetaAttributeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MetaAttribute.
     * @param {MetaAttributeUpsertArgs} args - Arguments to update or create a MetaAttribute.
     * @example
     * // Update or create a MetaAttribute
     * const metaAttribute = await prisma.metaAttribute.upsert({
     *   create: {
     *     // ... data to create a MetaAttribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetaAttribute we want to update
     *   }
     * })
     */
    upsert<T extends MetaAttributeUpsertArgs>(args: SelectSubset<T, MetaAttributeUpsertArgs<ExtArgs>>): Prisma__MetaAttributeClient<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MetaAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaAttributeCountArgs} args - Arguments to filter MetaAttributes to count.
     * @example
     * // Count the number of MetaAttributes
     * const count = await prisma.metaAttribute.count({
     *   where: {
     *     // ... the filter for the MetaAttributes we want to count
     *   }
     * })
    **/
    count<T extends MetaAttributeCountArgs>(
      args?: Subset<T, MetaAttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetaAttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetaAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaAttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetaAttributeAggregateArgs>(args: Subset<T, MetaAttributeAggregateArgs>): Prisma.PrismaPromise<GetMetaAttributeAggregateType<T>>

    /**
     * Group by MetaAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaAttributeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetaAttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetaAttributeGroupByArgs['orderBy'] }
        : { orderBy?: MetaAttributeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetaAttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetaAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetaAttribute model
   */
  readonly fields: MetaAttributeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetaAttribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetaAttributeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    values<T extends MetaAttribute$valuesArgs<ExtArgs> = {}>(args?: Subset<T, MetaAttribute$valuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entity<T extends MetaAttribute$entityArgs<ExtArgs> = {}>(args?: Subset<T, MetaAttribute$entityArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    relation<T extends MetaAttribute$relationArgs<ExtArgs> = {}>(args?: Subset<T, MetaAttribute$relationArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MetaAttribute model
   */
  interface MetaAttributeFieldRefs {
    readonly id: FieldRef<"MetaAttribute", 'String'>
    readonly title: FieldRef<"MetaAttribute", 'String'>
    readonly name: FieldRef<"MetaAttribute", 'String'>
    readonly description: FieldRef<"MetaAttribute", 'String'>
    readonly multiple: FieldRef<"MetaAttribute", 'Boolean'>
    readonly type: FieldRef<"MetaAttribute", 'String'>
    readonly required: FieldRef<"MetaAttribute", 'Boolean'>
    readonly readonly: FieldRef<"MetaAttribute", 'Boolean'>
    readonly order: FieldRef<"MetaAttribute", 'Int'>
    readonly disable: FieldRef<"MetaAttribute", 'Boolean'>
    readonly hash: FieldRef<"MetaAttribute", 'String'>
    readonly default: FieldRef<"MetaAttribute", 'String'>
    readonly role: FieldRef<"MetaAttribute", 'Int'>
    readonly security: FieldRef<"MetaAttribute", 'Boolean'>
    readonly field: FieldRef<"MetaAttribute", 'String'>
    readonly entityId: FieldRef<"MetaAttribute", 'String'>
    readonly relationId: FieldRef<"MetaAttribute", 'String'>
    readonly relationName: FieldRef<"MetaAttribute", 'String'>
    readonly createdAt: FieldRef<"MetaAttribute", 'DateTime'>
    readonly updatedAt: FieldRef<"MetaAttribute", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MetaAttribute findUnique
   */
  export type MetaAttributeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    /**
     * Filter, which MetaAttribute to fetch.
     */
    where: MetaAttributeWhereUniqueInput
  }

  /**
   * MetaAttribute findUniqueOrThrow
   */
  export type MetaAttributeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    /**
     * Filter, which MetaAttribute to fetch.
     */
    where: MetaAttributeWhereUniqueInput
  }

  /**
   * MetaAttribute findFirst
   */
  export type MetaAttributeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    /**
     * Filter, which MetaAttribute to fetch.
     */
    where?: MetaAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaAttributes to fetch.
     */
    orderBy?: MetaAttributeOrderByWithRelationInput | MetaAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaAttributes.
     */
    cursor?: MetaAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaAttributes.
     */
    distinct?: MetaAttributeScalarFieldEnum | MetaAttributeScalarFieldEnum[]
  }

  /**
   * MetaAttribute findFirstOrThrow
   */
  export type MetaAttributeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    /**
     * Filter, which MetaAttribute to fetch.
     */
    where?: MetaAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaAttributes to fetch.
     */
    orderBy?: MetaAttributeOrderByWithRelationInput | MetaAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaAttributes.
     */
    cursor?: MetaAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaAttributes.
     */
    distinct?: MetaAttributeScalarFieldEnum | MetaAttributeScalarFieldEnum[]
  }

  /**
   * MetaAttribute findMany
   */
  export type MetaAttributeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    /**
     * Filter, which MetaAttributes to fetch.
     */
    where?: MetaAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaAttributes to fetch.
     */
    orderBy?: MetaAttributeOrderByWithRelationInput | MetaAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetaAttributes.
     */
    cursor?: MetaAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaAttributes.
     */
    skip?: number
    distinct?: MetaAttributeScalarFieldEnum | MetaAttributeScalarFieldEnum[]
  }

  /**
   * MetaAttribute create
   */
  export type MetaAttributeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    /**
     * The data needed to create a MetaAttribute.
     */
    data: XOR<MetaAttributeCreateInput, MetaAttributeUncheckedCreateInput>
  }

  /**
   * MetaAttribute createMany
   */
  export type MetaAttributeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetaAttributes.
     */
    data: MetaAttributeCreateManyInput | MetaAttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetaAttribute createManyAndReturn
   */
  export type MetaAttributeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * The data used to create many MetaAttributes.
     */
    data: MetaAttributeCreateManyInput | MetaAttributeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetaAttribute update
   */
  export type MetaAttributeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    /**
     * The data needed to update a MetaAttribute.
     */
    data: XOR<MetaAttributeUpdateInput, MetaAttributeUncheckedUpdateInput>
    /**
     * Choose, which MetaAttribute to update.
     */
    where: MetaAttributeWhereUniqueInput
  }

  /**
   * MetaAttribute updateMany
   */
  export type MetaAttributeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetaAttributes.
     */
    data: XOR<MetaAttributeUpdateManyMutationInput, MetaAttributeUncheckedUpdateManyInput>
    /**
     * Filter which MetaAttributes to update
     */
    where?: MetaAttributeWhereInput
    /**
     * Limit how many MetaAttributes to update.
     */
    limit?: number
  }

  /**
   * MetaAttribute updateManyAndReturn
   */
  export type MetaAttributeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * The data used to update MetaAttributes.
     */
    data: XOR<MetaAttributeUpdateManyMutationInput, MetaAttributeUncheckedUpdateManyInput>
    /**
     * Filter which MetaAttributes to update
     */
    where?: MetaAttributeWhereInput
    /**
     * Limit how many MetaAttributes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetaAttribute upsert
   */
  export type MetaAttributeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    /**
     * The filter to search for the MetaAttribute to update in case it exists.
     */
    where: MetaAttributeWhereUniqueInput
    /**
     * In case the MetaAttribute found by the `where` argument doesn't exist, create a new MetaAttribute with this data.
     */
    create: XOR<MetaAttributeCreateInput, MetaAttributeUncheckedCreateInput>
    /**
     * In case the MetaAttribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetaAttributeUpdateInput, MetaAttributeUncheckedUpdateInput>
  }

  /**
   * MetaAttribute delete
   */
  export type MetaAttributeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    /**
     * Filter which MetaAttribute to delete.
     */
    where: MetaAttributeWhereUniqueInput
  }

  /**
   * MetaAttribute deleteMany
   */
  export type MetaAttributeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaAttributes to delete
     */
    where?: MetaAttributeWhereInput
    /**
     * Limit how many MetaAttributes to delete.
     */
    limit?: number
  }

  /**
   * MetaAttribute.values
   */
  export type MetaAttribute$valuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    where?: MetaValueWhereInput
    orderBy?: MetaValueOrderByWithRelationInput | MetaValueOrderByWithRelationInput[]
    cursor?: MetaValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MetaValueScalarFieldEnum | MetaValueScalarFieldEnum[]
  }

  /**
   * MetaAttribute.entity
   */
  export type MetaAttribute$entityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    where?: MetaEntityWhereInput
  }

  /**
   * MetaAttribute.relation
   */
  export type MetaAttribute$relationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    where?: MetaEntityWhereInput
  }

  /**
   * MetaAttribute without action
   */
  export type MetaAttributeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
  }


  /**
   * Model MetaRecord
   */

  export type AggregateMetaRecord = {
    _count: MetaRecordCountAggregateOutputType | null
    _min: MetaRecordMinAggregateOutputType | null
    _max: MetaRecordMaxAggregateOutputType | null
  }

  export type MetaRecordMinAggregateOutputType = {
    id: string | null
    entityId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MetaRecordMaxAggregateOutputType = {
    id: string | null
    entityId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MetaRecordCountAggregateOutputType = {
    id: number
    entityId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MetaRecordMinAggregateInputType = {
    id?: true
    entityId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MetaRecordMaxAggregateInputType = {
    id?: true
    entityId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MetaRecordCountAggregateInputType = {
    id?: true
    entityId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MetaRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaRecord to aggregate.
     */
    where?: MetaRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaRecords to fetch.
     */
    orderBy?: MetaRecordOrderByWithRelationInput | MetaRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetaRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetaRecords
    **/
    _count?: true | MetaRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetaRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetaRecordMaxAggregateInputType
  }

  export type GetMetaRecordAggregateType<T extends MetaRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateMetaRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetaRecord[P]>
      : GetScalarType<T[P], AggregateMetaRecord[P]>
  }




  export type MetaRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaRecordWhereInput
    orderBy?: MetaRecordOrderByWithAggregationInput | MetaRecordOrderByWithAggregationInput[]
    by: MetaRecordScalarFieldEnum[] | MetaRecordScalarFieldEnum
    having?: MetaRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetaRecordCountAggregateInputType | true
    _min?: MetaRecordMinAggregateInputType
    _max?: MetaRecordMaxAggregateInputType
  }

  export type MetaRecordGroupByOutputType = {
    id: string
    entityId: string | null
    createdAt: Date
    updatedAt: Date
    _count: MetaRecordCountAggregateOutputType | null
    _min: MetaRecordMinAggregateOutputType | null
    _max: MetaRecordMaxAggregateOutputType | null
  }

  type GetMetaRecordGroupByPayload<T extends MetaRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetaRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetaRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetaRecordGroupByOutputType[P]>
            : GetScalarType<T[P], MetaRecordGroupByOutputType[P]>
        }
      >
    >


  export type MetaRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entity?: boolean | MetaRecord$entityArgs<ExtArgs>
    parent?: boolean | MetaRecord$parentArgs<ExtArgs>
    value?: boolean | MetaRecord$valueArgs<ExtArgs>
    _count?: boolean | MetaRecordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metaRecord"]>

  export type MetaRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entity?: boolean | MetaRecord$entityArgs<ExtArgs>
  }, ExtArgs["result"]["metaRecord"]>

  export type MetaRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entity?: boolean | MetaRecord$entityArgs<ExtArgs>
  }, ExtArgs["result"]["metaRecord"]>

  export type MetaRecordSelectScalar = {
    id?: boolean
    entityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MetaRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entityId" | "createdAt" | "updatedAt", ExtArgs["result"]["metaRecord"]>
  export type MetaRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entity?: boolean | MetaRecord$entityArgs<ExtArgs>
    parent?: boolean | MetaRecord$parentArgs<ExtArgs>
    value?: boolean | MetaRecord$valueArgs<ExtArgs>
    _count?: boolean | MetaRecordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MetaRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entity?: boolean | MetaRecord$entityArgs<ExtArgs>
  }
  export type MetaRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entity?: boolean | MetaRecord$entityArgs<ExtArgs>
  }

  export type $MetaRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetaRecord"
    objects: {
      entity: Prisma.$MetaEntityPayload<ExtArgs> | null
      parent: Prisma.$MetaRecordRelationPayload<ExtArgs>[]
      value: Prisma.$MetaValuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entityId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["metaRecord"]>
    composites: {}
  }

  type MetaRecordGetPayload<S extends boolean | null | undefined | MetaRecordDefaultArgs> = $Result.GetResult<Prisma.$MetaRecordPayload, S>

  type MetaRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MetaRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MetaRecordCountAggregateInputType | true
    }

  export interface MetaRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetaRecord'], meta: { name: 'MetaRecord' } }
    /**
     * Find zero or one MetaRecord that matches the filter.
     * @param {MetaRecordFindUniqueArgs} args - Arguments to find a MetaRecord
     * @example
     * // Get one MetaRecord
     * const metaRecord = await prisma.metaRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetaRecordFindUniqueArgs>(args: SelectSubset<T, MetaRecordFindUniqueArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MetaRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MetaRecordFindUniqueOrThrowArgs} args - Arguments to find a MetaRecord
     * @example
     * // Get one MetaRecord
     * const metaRecord = await prisma.metaRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetaRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, MetaRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordFindFirstArgs} args - Arguments to find a MetaRecord
     * @example
     * // Get one MetaRecord
     * const metaRecord = await prisma.metaRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetaRecordFindFirstArgs>(args?: SelectSubset<T, MetaRecordFindFirstArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordFindFirstOrThrowArgs} args - Arguments to find a MetaRecord
     * @example
     * // Get one MetaRecord
     * const metaRecord = await prisma.metaRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetaRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, MetaRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MetaRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetaRecords
     * const metaRecords = await prisma.metaRecord.findMany()
     * 
     * // Get first 10 MetaRecords
     * const metaRecords = await prisma.metaRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const metaRecordWithIdOnly = await prisma.metaRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MetaRecordFindManyArgs>(args?: SelectSubset<T, MetaRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MetaRecord.
     * @param {MetaRecordCreateArgs} args - Arguments to create a MetaRecord.
     * @example
     * // Create one MetaRecord
     * const MetaRecord = await prisma.metaRecord.create({
     *   data: {
     *     // ... data to create a MetaRecord
     *   }
     * })
     * 
     */
    create<T extends MetaRecordCreateArgs>(args: SelectSubset<T, MetaRecordCreateArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MetaRecords.
     * @param {MetaRecordCreateManyArgs} args - Arguments to create many MetaRecords.
     * @example
     * // Create many MetaRecords
     * const metaRecord = await prisma.metaRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetaRecordCreateManyArgs>(args?: SelectSubset<T, MetaRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MetaRecords and returns the data saved in the database.
     * @param {MetaRecordCreateManyAndReturnArgs} args - Arguments to create many MetaRecords.
     * @example
     * // Create many MetaRecords
     * const metaRecord = await prisma.metaRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MetaRecords and only return the `id`
     * const metaRecordWithIdOnly = await prisma.metaRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MetaRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, MetaRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MetaRecord.
     * @param {MetaRecordDeleteArgs} args - Arguments to delete one MetaRecord.
     * @example
     * // Delete one MetaRecord
     * const MetaRecord = await prisma.metaRecord.delete({
     *   where: {
     *     // ... filter to delete one MetaRecord
     *   }
     * })
     * 
     */
    delete<T extends MetaRecordDeleteArgs>(args: SelectSubset<T, MetaRecordDeleteArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MetaRecord.
     * @param {MetaRecordUpdateArgs} args - Arguments to update one MetaRecord.
     * @example
     * // Update one MetaRecord
     * const metaRecord = await prisma.metaRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetaRecordUpdateArgs>(args: SelectSubset<T, MetaRecordUpdateArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MetaRecords.
     * @param {MetaRecordDeleteManyArgs} args - Arguments to filter MetaRecords to delete.
     * @example
     * // Delete a few MetaRecords
     * const { count } = await prisma.metaRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetaRecordDeleteManyArgs>(args?: SelectSubset<T, MetaRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetaRecords
     * const metaRecord = await prisma.metaRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetaRecordUpdateManyArgs>(args: SelectSubset<T, MetaRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaRecords and returns the data updated in the database.
     * @param {MetaRecordUpdateManyAndReturnArgs} args - Arguments to update many MetaRecords.
     * @example
     * // Update many MetaRecords
     * const metaRecord = await prisma.metaRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MetaRecords and only return the `id`
     * const metaRecordWithIdOnly = await prisma.metaRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MetaRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, MetaRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MetaRecord.
     * @param {MetaRecordUpsertArgs} args - Arguments to update or create a MetaRecord.
     * @example
     * // Update or create a MetaRecord
     * const metaRecord = await prisma.metaRecord.upsert({
     *   create: {
     *     // ... data to create a MetaRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetaRecord we want to update
     *   }
     * })
     */
    upsert<T extends MetaRecordUpsertArgs>(args: SelectSubset<T, MetaRecordUpsertArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MetaRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordCountArgs} args - Arguments to filter MetaRecords to count.
     * @example
     * // Count the number of MetaRecords
     * const count = await prisma.metaRecord.count({
     *   where: {
     *     // ... the filter for the MetaRecords we want to count
     *   }
     * })
    **/
    count<T extends MetaRecordCountArgs>(
      args?: Subset<T, MetaRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetaRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetaRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetaRecordAggregateArgs>(args: Subset<T, MetaRecordAggregateArgs>): Prisma.PrismaPromise<GetMetaRecordAggregateType<T>>

    /**
     * Group by MetaRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetaRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetaRecordGroupByArgs['orderBy'] }
        : { orderBy?: MetaRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetaRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetaRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetaRecord model
   */
  readonly fields: MetaRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetaRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetaRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entity<T extends MetaRecord$entityArgs<ExtArgs> = {}>(args?: Subset<T, MetaRecord$entityArgs<ExtArgs>>): Prisma__MetaEntityClient<$Result.GetResult<Prisma.$MetaEntityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    parent<T extends MetaRecord$parentArgs<ExtArgs> = {}>(args?: Subset<T, MetaRecord$parentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    value<T extends MetaRecord$valueArgs<ExtArgs> = {}>(args?: Subset<T, MetaRecord$valueArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MetaRecord model
   */
  interface MetaRecordFieldRefs {
    readonly id: FieldRef<"MetaRecord", 'String'>
    readonly entityId: FieldRef<"MetaRecord", 'String'>
    readonly createdAt: FieldRef<"MetaRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"MetaRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MetaRecord findUnique
   */
  export type MetaRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecord to fetch.
     */
    where: MetaRecordWhereUniqueInput
  }

  /**
   * MetaRecord findUniqueOrThrow
   */
  export type MetaRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecord to fetch.
     */
    where: MetaRecordWhereUniqueInput
  }

  /**
   * MetaRecord findFirst
   */
  export type MetaRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecord to fetch.
     */
    where?: MetaRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaRecords to fetch.
     */
    orderBy?: MetaRecordOrderByWithRelationInput | MetaRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaRecords.
     */
    cursor?: MetaRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaRecords.
     */
    distinct?: MetaRecordScalarFieldEnum | MetaRecordScalarFieldEnum[]
  }

  /**
   * MetaRecord findFirstOrThrow
   */
  export type MetaRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecord to fetch.
     */
    where?: MetaRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaRecords to fetch.
     */
    orderBy?: MetaRecordOrderByWithRelationInput | MetaRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaRecords.
     */
    cursor?: MetaRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaRecords.
     */
    distinct?: MetaRecordScalarFieldEnum | MetaRecordScalarFieldEnum[]
  }

  /**
   * MetaRecord findMany
   */
  export type MetaRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecords to fetch.
     */
    where?: MetaRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaRecords to fetch.
     */
    orderBy?: MetaRecordOrderByWithRelationInput | MetaRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetaRecords.
     */
    cursor?: MetaRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaRecords.
     */
    skip?: number
    distinct?: MetaRecordScalarFieldEnum | MetaRecordScalarFieldEnum[]
  }

  /**
   * MetaRecord create
   */
  export type MetaRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a MetaRecord.
     */
    data: XOR<MetaRecordCreateInput, MetaRecordUncheckedCreateInput>
  }

  /**
   * MetaRecord createMany
   */
  export type MetaRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetaRecords.
     */
    data: MetaRecordCreateManyInput | MetaRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetaRecord createManyAndReturn
   */
  export type MetaRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * The data used to create many MetaRecords.
     */
    data: MetaRecordCreateManyInput | MetaRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetaRecord update
   */
  export type MetaRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a MetaRecord.
     */
    data: XOR<MetaRecordUpdateInput, MetaRecordUncheckedUpdateInput>
    /**
     * Choose, which MetaRecord to update.
     */
    where: MetaRecordWhereUniqueInput
  }

  /**
   * MetaRecord updateMany
   */
  export type MetaRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetaRecords.
     */
    data: XOR<MetaRecordUpdateManyMutationInput, MetaRecordUncheckedUpdateManyInput>
    /**
     * Filter which MetaRecords to update
     */
    where?: MetaRecordWhereInput
    /**
     * Limit how many MetaRecords to update.
     */
    limit?: number
  }

  /**
   * MetaRecord updateManyAndReturn
   */
  export type MetaRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * The data used to update MetaRecords.
     */
    data: XOR<MetaRecordUpdateManyMutationInput, MetaRecordUncheckedUpdateManyInput>
    /**
     * Filter which MetaRecords to update
     */
    where?: MetaRecordWhereInput
    /**
     * Limit how many MetaRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetaRecord upsert
   */
  export type MetaRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the MetaRecord to update in case it exists.
     */
    where: MetaRecordWhereUniqueInput
    /**
     * In case the MetaRecord found by the `where` argument doesn't exist, create a new MetaRecord with this data.
     */
    create: XOR<MetaRecordCreateInput, MetaRecordUncheckedCreateInput>
    /**
     * In case the MetaRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetaRecordUpdateInput, MetaRecordUncheckedUpdateInput>
  }

  /**
   * MetaRecord delete
   */
  export type MetaRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
    /**
     * Filter which MetaRecord to delete.
     */
    where: MetaRecordWhereUniqueInput
  }

  /**
   * MetaRecord deleteMany
   */
  export type MetaRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaRecords to delete
     */
    where?: MetaRecordWhereInput
    /**
     * Limit how many MetaRecords to delete.
     */
    limit?: number
  }

  /**
   * MetaRecord.entity
   */
  export type MetaRecord$entityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaEntity
     */
    select?: MetaEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaEntity
     */
    omit?: MetaEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaEntityInclude<ExtArgs> | null
    where?: MetaEntityWhereInput
  }

  /**
   * MetaRecord.parent
   */
  export type MetaRecord$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    where?: MetaRecordRelationWhereInput
    orderBy?: MetaRecordRelationOrderByWithRelationInput | MetaRecordRelationOrderByWithRelationInput[]
    cursor?: MetaRecordRelationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MetaRecordRelationScalarFieldEnum | MetaRecordRelationScalarFieldEnum[]
  }

  /**
   * MetaRecord.value
   */
  export type MetaRecord$valueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    where?: MetaValueWhereInput
    orderBy?: MetaValueOrderByWithRelationInput | MetaValueOrderByWithRelationInput[]
    cursor?: MetaValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MetaValueScalarFieldEnum | MetaValueScalarFieldEnum[]
  }

  /**
   * MetaRecord without action
   */
  export type MetaRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecord
     */
    select?: MetaRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecord
     */
    omit?: MetaRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordInclude<ExtArgs> | null
  }


  /**
   * Model MetaValue
   */

  export type AggregateMetaValue = {
    _count: MetaValueCountAggregateOutputType | null
    _avg: MetaValueAvgAggregateOutputType | null
    _sum: MetaValueSumAggregateOutputType | null
    _min: MetaValueMinAggregateOutputType | null
    _max: MetaValueMaxAggregateOutputType | null
  }

  export type MetaValueAvgAggregateOutputType = {
    type: number | null
    order: number | null
    bit: number | null
    tinyint: number | null
    smallint: number | null
    int: number | null
    bigint: number | null
    float: number | null
  }

  export type MetaValueSumAggregateOutputType = {
    type: number | null
    order: number | null
    bit: number | null
    tinyint: number | null
    smallint: number | null
    int: number | null
    bigint: bigint | null
    float: number | null
  }

  export type MetaValueMinAggregateOutputType = {
    parentId: string | null
    name: string | null
    attributeId: string | null
    type: number | null
    childrenProperty: string | null
    order: number | null
    bit: number | null
    tinyint: number | null
    smallint: number | null
    int: number | null
    bigint: bigint | null
    float: number | null
    date: Date | null
    time: Date | null
    datetime: Date | null
    varchar: string | null
    text: string | null
    blob: Bytes | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MetaValueMaxAggregateOutputType = {
    parentId: string | null
    name: string | null
    attributeId: string | null
    type: number | null
    childrenProperty: string | null
    order: number | null
    bit: number | null
    tinyint: number | null
    smallint: number | null
    int: number | null
    bigint: bigint | null
    float: number | null
    date: Date | null
    time: Date | null
    datetime: Date | null
    varchar: string | null
    text: string | null
    blob: Bytes | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MetaValueCountAggregateOutputType = {
    parentId: number
    name: number
    attributeId: number
    type: number
    childrenProperty: number
    order: number
    bit: number
    tinyint: number
    smallint: number
    int: number
    bigint: number
    float: number
    date: number
    time: number
    datetime: number
    varchar: number
    text: number
    json: number
    blob: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MetaValueAvgAggregateInputType = {
    type?: true
    order?: true
    bit?: true
    tinyint?: true
    smallint?: true
    int?: true
    bigint?: true
    float?: true
  }

  export type MetaValueSumAggregateInputType = {
    type?: true
    order?: true
    bit?: true
    tinyint?: true
    smallint?: true
    int?: true
    bigint?: true
    float?: true
  }

  export type MetaValueMinAggregateInputType = {
    parentId?: true
    name?: true
    attributeId?: true
    type?: true
    childrenProperty?: true
    order?: true
    bit?: true
    tinyint?: true
    smallint?: true
    int?: true
    bigint?: true
    float?: true
    date?: true
    time?: true
    datetime?: true
    varchar?: true
    text?: true
    blob?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MetaValueMaxAggregateInputType = {
    parentId?: true
    name?: true
    attributeId?: true
    type?: true
    childrenProperty?: true
    order?: true
    bit?: true
    tinyint?: true
    smallint?: true
    int?: true
    bigint?: true
    float?: true
    date?: true
    time?: true
    datetime?: true
    varchar?: true
    text?: true
    blob?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MetaValueCountAggregateInputType = {
    parentId?: true
    name?: true
    attributeId?: true
    type?: true
    childrenProperty?: true
    order?: true
    bit?: true
    tinyint?: true
    smallint?: true
    int?: true
    bigint?: true
    float?: true
    date?: true
    time?: true
    datetime?: true
    varchar?: true
    text?: true
    json?: true
    blob?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MetaValueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaValue to aggregate.
     */
    where?: MetaValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaValues to fetch.
     */
    orderBy?: MetaValueOrderByWithRelationInput | MetaValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetaValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetaValues
    **/
    _count?: true | MetaValueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MetaValueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MetaValueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetaValueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetaValueMaxAggregateInputType
  }

  export type GetMetaValueAggregateType<T extends MetaValueAggregateArgs> = {
        [P in keyof T & keyof AggregateMetaValue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetaValue[P]>
      : GetScalarType<T[P], AggregateMetaValue[P]>
  }




  export type MetaValueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaValueWhereInput
    orderBy?: MetaValueOrderByWithAggregationInput | MetaValueOrderByWithAggregationInput[]
    by: MetaValueScalarFieldEnum[] | MetaValueScalarFieldEnum
    having?: MetaValueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetaValueCountAggregateInputType | true
    _avg?: MetaValueAvgAggregateInputType
    _sum?: MetaValueSumAggregateInputType
    _min?: MetaValueMinAggregateInputType
    _max?: MetaValueMaxAggregateInputType
  }

  export type MetaValueGroupByOutputType = {
    parentId: string
    name: string
    attributeId: string | null
    type: number
    childrenProperty: string | null
    order: number | null
    bit: number | null
    tinyint: number | null
    smallint: number | null
    int: number | null
    bigint: bigint | null
    float: number | null
    date: Date | null
    time: Date | null
    datetime: Date | null
    varchar: string | null
    text: string | null
    json: JsonValue | null
    blob: Bytes | null
    createdAt: Date
    updatedAt: Date
    _count: MetaValueCountAggregateOutputType | null
    _avg: MetaValueAvgAggregateOutputType | null
    _sum: MetaValueSumAggregateOutputType | null
    _min: MetaValueMinAggregateOutputType | null
    _max: MetaValueMaxAggregateOutputType | null
  }

  type GetMetaValueGroupByPayload<T extends MetaValueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetaValueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetaValueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetaValueGroupByOutputType[P]>
            : GetScalarType<T[P], MetaValueGroupByOutputType[P]>
        }
      >
    >


  export type MetaValueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    parentId?: boolean
    name?: boolean
    attributeId?: boolean
    type?: boolean
    childrenProperty?: boolean
    order?: boolean
    bit?: boolean
    tinyint?: boolean
    smallint?: boolean
    int?: boolean
    bigint?: boolean
    float?: boolean
    date?: boolean
    time?: boolean
    datetime?: boolean
    varchar?: boolean
    text?: boolean
    json?: boolean
    blob?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | MetaRecordDefaultArgs<ExtArgs>
    attribute?: boolean | MetaValue$attributeArgs<ExtArgs>
    children?: boolean | MetaValue$childrenArgs<ExtArgs>
    _count?: boolean | MetaValueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metaValue"]>

  export type MetaValueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    parentId?: boolean
    name?: boolean
    attributeId?: boolean
    type?: boolean
    childrenProperty?: boolean
    order?: boolean
    bit?: boolean
    tinyint?: boolean
    smallint?: boolean
    int?: boolean
    bigint?: boolean
    float?: boolean
    date?: boolean
    time?: boolean
    datetime?: boolean
    varchar?: boolean
    text?: boolean
    json?: boolean
    blob?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | MetaRecordDefaultArgs<ExtArgs>
    attribute?: boolean | MetaValue$attributeArgs<ExtArgs>
  }, ExtArgs["result"]["metaValue"]>

  export type MetaValueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    parentId?: boolean
    name?: boolean
    attributeId?: boolean
    type?: boolean
    childrenProperty?: boolean
    order?: boolean
    bit?: boolean
    tinyint?: boolean
    smallint?: boolean
    int?: boolean
    bigint?: boolean
    float?: boolean
    date?: boolean
    time?: boolean
    datetime?: boolean
    varchar?: boolean
    text?: boolean
    json?: boolean
    blob?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | MetaRecordDefaultArgs<ExtArgs>
    attribute?: boolean | MetaValue$attributeArgs<ExtArgs>
  }, ExtArgs["result"]["metaValue"]>

  export type MetaValueSelectScalar = {
    parentId?: boolean
    name?: boolean
    attributeId?: boolean
    type?: boolean
    childrenProperty?: boolean
    order?: boolean
    bit?: boolean
    tinyint?: boolean
    smallint?: boolean
    int?: boolean
    bigint?: boolean
    float?: boolean
    date?: boolean
    time?: boolean
    datetime?: boolean
    varchar?: boolean
    text?: boolean
    json?: boolean
    blob?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MetaValueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"parentId" | "name" | "attributeId" | "type" | "childrenProperty" | "order" | "bit" | "tinyint" | "smallint" | "int" | "bigint" | "float" | "date" | "time" | "datetime" | "varchar" | "text" | "json" | "blob" | "createdAt" | "updatedAt", ExtArgs["result"]["metaValue"]>
  export type MetaValueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | MetaRecordDefaultArgs<ExtArgs>
    attribute?: boolean | MetaValue$attributeArgs<ExtArgs>
    children?: boolean | MetaValue$childrenArgs<ExtArgs>
    _count?: boolean | MetaValueCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MetaValueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | MetaRecordDefaultArgs<ExtArgs>
    attribute?: boolean | MetaValue$attributeArgs<ExtArgs>
  }
  export type MetaValueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | MetaRecordDefaultArgs<ExtArgs>
    attribute?: boolean | MetaValue$attributeArgs<ExtArgs>
  }

  export type $MetaValuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetaValue"
    objects: {
      parent: Prisma.$MetaRecordPayload<ExtArgs>
      attribute: Prisma.$MetaAttributePayload<ExtArgs> | null
      children: Prisma.$MetaRecordRelationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      parentId: string
      name: string
      attributeId: string | null
      type: number
      childrenProperty: string | null
      order: number | null
      bit: number | null
      tinyint: number | null
      smallint: number | null
      int: number | null
      bigint: bigint | null
      float: number | null
      date: Date | null
      time: Date | null
      datetime: Date | null
      varchar: string | null
      text: string | null
      json: Prisma.JsonValue | null
      blob: Prisma.Bytes | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["metaValue"]>
    composites: {}
  }

  type MetaValueGetPayload<S extends boolean | null | undefined | MetaValueDefaultArgs> = $Result.GetResult<Prisma.$MetaValuePayload, S>

  type MetaValueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MetaValueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MetaValueCountAggregateInputType | true
    }

  export interface MetaValueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetaValue'], meta: { name: 'MetaValue' } }
    /**
     * Find zero or one MetaValue that matches the filter.
     * @param {MetaValueFindUniqueArgs} args - Arguments to find a MetaValue
     * @example
     * // Get one MetaValue
     * const metaValue = await prisma.metaValue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetaValueFindUniqueArgs>(args: SelectSubset<T, MetaValueFindUniqueArgs<ExtArgs>>): Prisma__MetaValueClient<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MetaValue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MetaValueFindUniqueOrThrowArgs} args - Arguments to find a MetaValue
     * @example
     * // Get one MetaValue
     * const metaValue = await prisma.metaValue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetaValueFindUniqueOrThrowArgs>(args: SelectSubset<T, MetaValueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetaValueClient<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaValue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaValueFindFirstArgs} args - Arguments to find a MetaValue
     * @example
     * // Get one MetaValue
     * const metaValue = await prisma.metaValue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetaValueFindFirstArgs>(args?: SelectSubset<T, MetaValueFindFirstArgs<ExtArgs>>): Prisma__MetaValueClient<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaValue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaValueFindFirstOrThrowArgs} args - Arguments to find a MetaValue
     * @example
     * // Get one MetaValue
     * const metaValue = await prisma.metaValue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetaValueFindFirstOrThrowArgs>(args?: SelectSubset<T, MetaValueFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetaValueClient<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MetaValues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaValueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetaValues
     * const metaValues = await prisma.metaValue.findMany()
     * 
     * // Get first 10 MetaValues
     * const metaValues = await prisma.metaValue.findMany({ take: 10 })
     * 
     * // Only select the `parentId`
     * const metaValueWithParentIdOnly = await prisma.metaValue.findMany({ select: { parentId: true } })
     * 
     */
    findMany<T extends MetaValueFindManyArgs>(args?: SelectSubset<T, MetaValueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MetaValue.
     * @param {MetaValueCreateArgs} args - Arguments to create a MetaValue.
     * @example
     * // Create one MetaValue
     * const MetaValue = await prisma.metaValue.create({
     *   data: {
     *     // ... data to create a MetaValue
     *   }
     * })
     * 
     */
    create<T extends MetaValueCreateArgs>(args: SelectSubset<T, MetaValueCreateArgs<ExtArgs>>): Prisma__MetaValueClient<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MetaValues.
     * @param {MetaValueCreateManyArgs} args - Arguments to create many MetaValues.
     * @example
     * // Create many MetaValues
     * const metaValue = await prisma.metaValue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetaValueCreateManyArgs>(args?: SelectSubset<T, MetaValueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MetaValues and returns the data saved in the database.
     * @param {MetaValueCreateManyAndReturnArgs} args - Arguments to create many MetaValues.
     * @example
     * // Create many MetaValues
     * const metaValue = await prisma.metaValue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MetaValues and only return the `parentId`
     * const metaValueWithParentIdOnly = await prisma.metaValue.createManyAndReturn({
     *   select: { parentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MetaValueCreateManyAndReturnArgs>(args?: SelectSubset<T, MetaValueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MetaValue.
     * @param {MetaValueDeleteArgs} args - Arguments to delete one MetaValue.
     * @example
     * // Delete one MetaValue
     * const MetaValue = await prisma.metaValue.delete({
     *   where: {
     *     // ... filter to delete one MetaValue
     *   }
     * })
     * 
     */
    delete<T extends MetaValueDeleteArgs>(args: SelectSubset<T, MetaValueDeleteArgs<ExtArgs>>): Prisma__MetaValueClient<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MetaValue.
     * @param {MetaValueUpdateArgs} args - Arguments to update one MetaValue.
     * @example
     * // Update one MetaValue
     * const metaValue = await prisma.metaValue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetaValueUpdateArgs>(args: SelectSubset<T, MetaValueUpdateArgs<ExtArgs>>): Prisma__MetaValueClient<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MetaValues.
     * @param {MetaValueDeleteManyArgs} args - Arguments to filter MetaValues to delete.
     * @example
     * // Delete a few MetaValues
     * const { count } = await prisma.metaValue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetaValueDeleteManyArgs>(args?: SelectSubset<T, MetaValueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaValueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetaValues
     * const metaValue = await prisma.metaValue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetaValueUpdateManyArgs>(args: SelectSubset<T, MetaValueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaValues and returns the data updated in the database.
     * @param {MetaValueUpdateManyAndReturnArgs} args - Arguments to update many MetaValues.
     * @example
     * // Update many MetaValues
     * const metaValue = await prisma.metaValue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MetaValues and only return the `parentId`
     * const metaValueWithParentIdOnly = await prisma.metaValue.updateManyAndReturn({
     *   select: { parentId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MetaValueUpdateManyAndReturnArgs>(args: SelectSubset<T, MetaValueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MetaValue.
     * @param {MetaValueUpsertArgs} args - Arguments to update or create a MetaValue.
     * @example
     * // Update or create a MetaValue
     * const metaValue = await prisma.metaValue.upsert({
     *   create: {
     *     // ... data to create a MetaValue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetaValue we want to update
     *   }
     * })
     */
    upsert<T extends MetaValueUpsertArgs>(args: SelectSubset<T, MetaValueUpsertArgs<ExtArgs>>): Prisma__MetaValueClient<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MetaValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaValueCountArgs} args - Arguments to filter MetaValues to count.
     * @example
     * // Count the number of MetaValues
     * const count = await prisma.metaValue.count({
     *   where: {
     *     // ... the filter for the MetaValues we want to count
     *   }
     * })
    **/
    count<T extends MetaValueCountArgs>(
      args?: Subset<T, MetaValueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetaValueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetaValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaValueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetaValueAggregateArgs>(args: Subset<T, MetaValueAggregateArgs>): Prisma.PrismaPromise<GetMetaValueAggregateType<T>>

    /**
     * Group by MetaValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaValueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetaValueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetaValueGroupByArgs['orderBy'] }
        : { orderBy?: MetaValueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetaValueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetaValueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetaValue model
   */
  readonly fields: MetaValueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetaValue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetaValueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends MetaRecordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MetaRecordDefaultArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attribute<T extends MetaValue$attributeArgs<ExtArgs> = {}>(args?: Subset<T, MetaValue$attributeArgs<ExtArgs>>): Prisma__MetaAttributeClient<$Result.GetResult<Prisma.$MetaAttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends MetaValue$childrenArgs<ExtArgs> = {}>(args?: Subset<T, MetaValue$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MetaValue model
   */
  interface MetaValueFieldRefs {
    readonly parentId: FieldRef<"MetaValue", 'String'>
    readonly name: FieldRef<"MetaValue", 'String'>
    readonly attributeId: FieldRef<"MetaValue", 'String'>
    readonly type: FieldRef<"MetaValue", 'Int'>
    readonly childrenProperty: FieldRef<"MetaValue", 'String'>
    readonly order: FieldRef<"MetaValue", 'Int'>
    readonly bit: FieldRef<"MetaValue", 'Int'>
    readonly tinyint: FieldRef<"MetaValue", 'Int'>
    readonly smallint: FieldRef<"MetaValue", 'Int'>
    readonly int: FieldRef<"MetaValue", 'Int'>
    readonly bigint: FieldRef<"MetaValue", 'BigInt'>
    readonly float: FieldRef<"MetaValue", 'Float'>
    readonly date: FieldRef<"MetaValue", 'DateTime'>
    readonly time: FieldRef<"MetaValue", 'DateTime'>
    readonly datetime: FieldRef<"MetaValue", 'DateTime'>
    readonly varchar: FieldRef<"MetaValue", 'String'>
    readonly text: FieldRef<"MetaValue", 'String'>
    readonly json: FieldRef<"MetaValue", 'Json'>
    readonly blob: FieldRef<"MetaValue", 'Bytes'>
    readonly createdAt: FieldRef<"MetaValue", 'DateTime'>
    readonly updatedAt: FieldRef<"MetaValue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MetaValue findUnique
   */
  export type MetaValueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    /**
     * Filter, which MetaValue to fetch.
     */
    where: MetaValueWhereUniqueInput
  }

  /**
   * MetaValue findUniqueOrThrow
   */
  export type MetaValueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    /**
     * Filter, which MetaValue to fetch.
     */
    where: MetaValueWhereUniqueInput
  }

  /**
   * MetaValue findFirst
   */
  export type MetaValueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    /**
     * Filter, which MetaValue to fetch.
     */
    where?: MetaValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaValues to fetch.
     */
    orderBy?: MetaValueOrderByWithRelationInput | MetaValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaValues.
     */
    cursor?: MetaValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaValues.
     */
    distinct?: MetaValueScalarFieldEnum | MetaValueScalarFieldEnum[]
  }

  /**
   * MetaValue findFirstOrThrow
   */
  export type MetaValueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    /**
     * Filter, which MetaValue to fetch.
     */
    where?: MetaValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaValues to fetch.
     */
    orderBy?: MetaValueOrderByWithRelationInput | MetaValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaValues.
     */
    cursor?: MetaValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaValues.
     */
    distinct?: MetaValueScalarFieldEnum | MetaValueScalarFieldEnum[]
  }

  /**
   * MetaValue findMany
   */
  export type MetaValueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    /**
     * Filter, which MetaValues to fetch.
     */
    where?: MetaValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaValues to fetch.
     */
    orderBy?: MetaValueOrderByWithRelationInput | MetaValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetaValues.
     */
    cursor?: MetaValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaValues.
     */
    skip?: number
    distinct?: MetaValueScalarFieldEnum | MetaValueScalarFieldEnum[]
  }

  /**
   * MetaValue create
   */
  export type MetaValueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    /**
     * The data needed to create a MetaValue.
     */
    data: XOR<MetaValueCreateInput, MetaValueUncheckedCreateInput>
  }

  /**
   * MetaValue createMany
   */
  export type MetaValueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetaValues.
     */
    data: MetaValueCreateManyInput | MetaValueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetaValue createManyAndReturn
   */
  export type MetaValueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * The data used to create many MetaValues.
     */
    data: MetaValueCreateManyInput | MetaValueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetaValue update
   */
  export type MetaValueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    /**
     * The data needed to update a MetaValue.
     */
    data: XOR<MetaValueUpdateInput, MetaValueUncheckedUpdateInput>
    /**
     * Choose, which MetaValue to update.
     */
    where: MetaValueWhereUniqueInput
  }

  /**
   * MetaValue updateMany
   */
  export type MetaValueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetaValues.
     */
    data: XOR<MetaValueUpdateManyMutationInput, MetaValueUncheckedUpdateManyInput>
    /**
     * Filter which MetaValues to update
     */
    where?: MetaValueWhereInput
    /**
     * Limit how many MetaValues to update.
     */
    limit?: number
  }

  /**
   * MetaValue updateManyAndReturn
   */
  export type MetaValueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * The data used to update MetaValues.
     */
    data: XOR<MetaValueUpdateManyMutationInput, MetaValueUncheckedUpdateManyInput>
    /**
     * Filter which MetaValues to update
     */
    where?: MetaValueWhereInput
    /**
     * Limit how many MetaValues to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetaValue upsert
   */
  export type MetaValueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    /**
     * The filter to search for the MetaValue to update in case it exists.
     */
    where: MetaValueWhereUniqueInput
    /**
     * In case the MetaValue found by the `where` argument doesn't exist, create a new MetaValue with this data.
     */
    create: XOR<MetaValueCreateInput, MetaValueUncheckedCreateInput>
    /**
     * In case the MetaValue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetaValueUpdateInput, MetaValueUncheckedUpdateInput>
  }

  /**
   * MetaValue delete
   */
  export type MetaValueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
    /**
     * Filter which MetaValue to delete.
     */
    where: MetaValueWhereUniqueInput
  }

  /**
   * MetaValue deleteMany
   */
  export type MetaValueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaValues to delete
     */
    where?: MetaValueWhereInput
    /**
     * Limit how many MetaValues to delete.
     */
    limit?: number
  }

  /**
   * MetaValue.attribute
   */
  export type MetaValue$attributeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaAttribute
     */
    select?: MetaAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaAttribute
     */
    omit?: MetaAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaAttributeInclude<ExtArgs> | null
    where?: MetaAttributeWhereInput
  }

  /**
   * MetaValue.children
   */
  export type MetaValue$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    where?: MetaRecordRelationWhereInput
    orderBy?: MetaRecordRelationOrderByWithRelationInput | MetaRecordRelationOrderByWithRelationInput[]
    cursor?: MetaRecordRelationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MetaRecordRelationScalarFieldEnum | MetaRecordRelationScalarFieldEnum[]
  }

  /**
   * MetaValue without action
   */
  export type MetaValueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaValue
     */
    select?: MetaValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaValue
     */
    omit?: MetaValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaValueInclude<ExtArgs> | null
  }


  /**
   * Model MetaRecordRelation
   */

  export type AggregateMetaRecordRelation = {
    _count: MetaRecordRelationCountAggregateOutputType | null
    _min: MetaRecordRelationMinAggregateOutputType | null
    _max: MetaRecordRelationMaxAggregateOutputType | null
  }

  export type MetaRecordRelationMinAggregateOutputType = {
    valueParentId: string | null
    valueName: string | null
    recordId: string | null
  }

  export type MetaRecordRelationMaxAggregateOutputType = {
    valueParentId: string | null
    valueName: string | null
    recordId: string | null
  }

  export type MetaRecordRelationCountAggregateOutputType = {
    valueParentId: number
    valueName: number
    recordId: number
    _all: number
  }


  export type MetaRecordRelationMinAggregateInputType = {
    valueParentId?: true
    valueName?: true
    recordId?: true
  }

  export type MetaRecordRelationMaxAggregateInputType = {
    valueParentId?: true
    valueName?: true
    recordId?: true
  }

  export type MetaRecordRelationCountAggregateInputType = {
    valueParentId?: true
    valueName?: true
    recordId?: true
    _all?: true
  }

  export type MetaRecordRelationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaRecordRelation to aggregate.
     */
    where?: MetaRecordRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaRecordRelations to fetch.
     */
    orderBy?: MetaRecordRelationOrderByWithRelationInput | MetaRecordRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetaRecordRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaRecordRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaRecordRelations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetaRecordRelations
    **/
    _count?: true | MetaRecordRelationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetaRecordRelationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetaRecordRelationMaxAggregateInputType
  }

  export type GetMetaRecordRelationAggregateType<T extends MetaRecordRelationAggregateArgs> = {
        [P in keyof T & keyof AggregateMetaRecordRelation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetaRecordRelation[P]>
      : GetScalarType<T[P], AggregateMetaRecordRelation[P]>
  }




  export type MetaRecordRelationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaRecordRelationWhereInput
    orderBy?: MetaRecordRelationOrderByWithAggregationInput | MetaRecordRelationOrderByWithAggregationInput[]
    by: MetaRecordRelationScalarFieldEnum[] | MetaRecordRelationScalarFieldEnum
    having?: MetaRecordRelationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetaRecordRelationCountAggregateInputType | true
    _min?: MetaRecordRelationMinAggregateInputType
    _max?: MetaRecordRelationMaxAggregateInputType
  }

  export type MetaRecordRelationGroupByOutputType = {
    valueParentId: string
    valueName: string
    recordId: string
    _count: MetaRecordRelationCountAggregateOutputType | null
    _min: MetaRecordRelationMinAggregateOutputType | null
    _max: MetaRecordRelationMaxAggregateOutputType | null
  }

  type GetMetaRecordRelationGroupByPayload<T extends MetaRecordRelationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetaRecordRelationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetaRecordRelationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetaRecordRelationGroupByOutputType[P]>
            : GetScalarType<T[P], MetaRecordRelationGroupByOutputType[P]>
        }
      >
    >


  export type MetaRecordRelationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    valueParentId?: boolean
    valueName?: boolean
    recordId?: boolean
    value?: boolean | MetaValueDefaultArgs<ExtArgs>
    record?: boolean | MetaRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metaRecordRelation"]>

  export type MetaRecordRelationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    valueParentId?: boolean
    valueName?: boolean
    recordId?: boolean
    value?: boolean | MetaValueDefaultArgs<ExtArgs>
    record?: boolean | MetaRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metaRecordRelation"]>

  export type MetaRecordRelationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    valueParentId?: boolean
    valueName?: boolean
    recordId?: boolean
    value?: boolean | MetaValueDefaultArgs<ExtArgs>
    record?: boolean | MetaRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metaRecordRelation"]>

  export type MetaRecordRelationSelectScalar = {
    valueParentId?: boolean
    valueName?: boolean
    recordId?: boolean
  }

  export type MetaRecordRelationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"valueParentId" | "valueName" | "recordId", ExtArgs["result"]["metaRecordRelation"]>
  export type MetaRecordRelationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    value?: boolean | MetaValueDefaultArgs<ExtArgs>
    record?: boolean | MetaRecordDefaultArgs<ExtArgs>
  }
  export type MetaRecordRelationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    value?: boolean | MetaValueDefaultArgs<ExtArgs>
    record?: boolean | MetaRecordDefaultArgs<ExtArgs>
  }
  export type MetaRecordRelationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    value?: boolean | MetaValueDefaultArgs<ExtArgs>
    record?: boolean | MetaRecordDefaultArgs<ExtArgs>
  }

  export type $MetaRecordRelationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetaRecordRelation"
    objects: {
      value: Prisma.$MetaValuePayload<ExtArgs>
      record: Prisma.$MetaRecordPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      valueParentId: string
      valueName: string
      recordId: string
    }, ExtArgs["result"]["metaRecordRelation"]>
    composites: {}
  }

  type MetaRecordRelationGetPayload<S extends boolean | null | undefined | MetaRecordRelationDefaultArgs> = $Result.GetResult<Prisma.$MetaRecordRelationPayload, S>

  type MetaRecordRelationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MetaRecordRelationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MetaRecordRelationCountAggregateInputType | true
    }

  export interface MetaRecordRelationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetaRecordRelation'], meta: { name: 'MetaRecordRelation' } }
    /**
     * Find zero or one MetaRecordRelation that matches the filter.
     * @param {MetaRecordRelationFindUniqueArgs} args - Arguments to find a MetaRecordRelation
     * @example
     * // Get one MetaRecordRelation
     * const metaRecordRelation = await prisma.metaRecordRelation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetaRecordRelationFindUniqueArgs>(args: SelectSubset<T, MetaRecordRelationFindUniqueArgs<ExtArgs>>): Prisma__MetaRecordRelationClient<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MetaRecordRelation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MetaRecordRelationFindUniqueOrThrowArgs} args - Arguments to find a MetaRecordRelation
     * @example
     * // Get one MetaRecordRelation
     * const metaRecordRelation = await prisma.metaRecordRelation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetaRecordRelationFindUniqueOrThrowArgs>(args: SelectSubset<T, MetaRecordRelationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetaRecordRelationClient<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaRecordRelation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordRelationFindFirstArgs} args - Arguments to find a MetaRecordRelation
     * @example
     * // Get one MetaRecordRelation
     * const metaRecordRelation = await prisma.metaRecordRelation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetaRecordRelationFindFirstArgs>(args?: SelectSubset<T, MetaRecordRelationFindFirstArgs<ExtArgs>>): Prisma__MetaRecordRelationClient<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaRecordRelation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordRelationFindFirstOrThrowArgs} args - Arguments to find a MetaRecordRelation
     * @example
     * // Get one MetaRecordRelation
     * const metaRecordRelation = await prisma.metaRecordRelation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetaRecordRelationFindFirstOrThrowArgs>(args?: SelectSubset<T, MetaRecordRelationFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetaRecordRelationClient<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MetaRecordRelations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordRelationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetaRecordRelations
     * const metaRecordRelations = await prisma.metaRecordRelation.findMany()
     * 
     * // Get first 10 MetaRecordRelations
     * const metaRecordRelations = await prisma.metaRecordRelation.findMany({ take: 10 })
     * 
     * // Only select the `valueParentId`
     * const metaRecordRelationWithValueParentIdOnly = await prisma.metaRecordRelation.findMany({ select: { valueParentId: true } })
     * 
     */
    findMany<T extends MetaRecordRelationFindManyArgs>(args?: SelectSubset<T, MetaRecordRelationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MetaRecordRelation.
     * @param {MetaRecordRelationCreateArgs} args - Arguments to create a MetaRecordRelation.
     * @example
     * // Create one MetaRecordRelation
     * const MetaRecordRelation = await prisma.metaRecordRelation.create({
     *   data: {
     *     // ... data to create a MetaRecordRelation
     *   }
     * })
     * 
     */
    create<T extends MetaRecordRelationCreateArgs>(args: SelectSubset<T, MetaRecordRelationCreateArgs<ExtArgs>>): Prisma__MetaRecordRelationClient<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MetaRecordRelations.
     * @param {MetaRecordRelationCreateManyArgs} args - Arguments to create many MetaRecordRelations.
     * @example
     * // Create many MetaRecordRelations
     * const metaRecordRelation = await prisma.metaRecordRelation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetaRecordRelationCreateManyArgs>(args?: SelectSubset<T, MetaRecordRelationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MetaRecordRelations and returns the data saved in the database.
     * @param {MetaRecordRelationCreateManyAndReturnArgs} args - Arguments to create many MetaRecordRelations.
     * @example
     * // Create many MetaRecordRelations
     * const metaRecordRelation = await prisma.metaRecordRelation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MetaRecordRelations and only return the `valueParentId`
     * const metaRecordRelationWithValueParentIdOnly = await prisma.metaRecordRelation.createManyAndReturn({
     *   select: { valueParentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MetaRecordRelationCreateManyAndReturnArgs>(args?: SelectSubset<T, MetaRecordRelationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MetaRecordRelation.
     * @param {MetaRecordRelationDeleteArgs} args - Arguments to delete one MetaRecordRelation.
     * @example
     * // Delete one MetaRecordRelation
     * const MetaRecordRelation = await prisma.metaRecordRelation.delete({
     *   where: {
     *     // ... filter to delete one MetaRecordRelation
     *   }
     * })
     * 
     */
    delete<T extends MetaRecordRelationDeleteArgs>(args: SelectSubset<T, MetaRecordRelationDeleteArgs<ExtArgs>>): Prisma__MetaRecordRelationClient<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MetaRecordRelation.
     * @param {MetaRecordRelationUpdateArgs} args - Arguments to update one MetaRecordRelation.
     * @example
     * // Update one MetaRecordRelation
     * const metaRecordRelation = await prisma.metaRecordRelation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetaRecordRelationUpdateArgs>(args: SelectSubset<T, MetaRecordRelationUpdateArgs<ExtArgs>>): Prisma__MetaRecordRelationClient<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MetaRecordRelations.
     * @param {MetaRecordRelationDeleteManyArgs} args - Arguments to filter MetaRecordRelations to delete.
     * @example
     * // Delete a few MetaRecordRelations
     * const { count } = await prisma.metaRecordRelation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetaRecordRelationDeleteManyArgs>(args?: SelectSubset<T, MetaRecordRelationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaRecordRelations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordRelationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetaRecordRelations
     * const metaRecordRelation = await prisma.metaRecordRelation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetaRecordRelationUpdateManyArgs>(args: SelectSubset<T, MetaRecordRelationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaRecordRelations and returns the data updated in the database.
     * @param {MetaRecordRelationUpdateManyAndReturnArgs} args - Arguments to update many MetaRecordRelations.
     * @example
     * // Update many MetaRecordRelations
     * const metaRecordRelation = await prisma.metaRecordRelation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MetaRecordRelations and only return the `valueParentId`
     * const metaRecordRelationWithValueParentIdOnly = await prisma.metaRecordRelation.updateManyAndReturn({
     *   select: { valueParentId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MetaRecordRelationUpdateManyAndReturnArgs>(args: SelectSubset<T, MetaRecordRelationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MetaRecordRelation.
     * @param {MetaRecordRelationUpsertArgs} args - Arguments to update or create a MetaRecordRelation.
     * @example
     * // Update or create a MetaRecordRelation
     * const metaRecordRelation = await prisma.metaRecordRelation.upsert({
     *   create: {
     *     // ... data to create a MetaRecordRelation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetaRecordRelation we want to update
     *   }
     * })
     */
    upsert<T extends MetaRecordRelationUpsertArgs>(args: SelectSubset<T, MetaRecordRelationUpsertArgs<ExtArgs>>): Prisma__MetaRecordRelationClient<$Result.GetResult<Prisma.$MetaRecordRelationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MetaRecordRelations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordRelationCountArgs} args - Arguments to filter MetaRecordRelations to count.
     * @example
     * // Count the number of MetaRecordRelations
     * const count = await prisma.metaRecordRelation.count({
     *   where: {
     *     // ... the filter for the MetaRecordRelations we want to count
     *   }
     * })
    **/
    count<T extends MetaRecordRelationCountArgs>(
      args?: Subset<T, MetaRecordRelationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetaRecordRelationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetaRecordRelation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordRelationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetaRecordRelationAggregateArgs>(args: Subset<T, MetaRecordRelationAggregateArgs>): Prisma.PrismaPromise<GetMetaRecordRelationAggregateType<T>>

    /**
     * Group by MetaRecordRelation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaRecordRelationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetaRecordRelationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetaRecordRelationGroupByArgs['orderBy'] }
        : { orderBy?: MetaRecordRelationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetaRecordRelationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetaRecordRelationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetaRecordRelation model
   */
  readonly fields: MetaRecordRelationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetaRecordRelation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetaRecordRelationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    value<T extends MetaValueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MetaValueDefaultArgs<ExtArgs>>): Prisma__MetaValueClient<$Result.GetResult<Prisma.$MetaValuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    record<T extends MetaRecordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MetaRecordDefaultArgs<ExtArgs>>): Prisma__MetaRecordClient<$Result.GetResult<Prisma.$MetaRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MetaRecordRelation model
   */
  interface MetaRecordRelationFieldRefs {
    readonly valueParentId: FieldRef<"MetaRecordRelation", 'String'>
    readonly valueName: FieldRef<"MetaRecordRelation", 'String'>
    readonly recordId: FieldRef<"MetaRecordRelation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MetaRecordRelation findUnique
   */
  export type MetaRecordRelationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecordRelation to fetch.
     */
    where: MetaRecordRelationWhereUniqueInput
  }

  /**
   * MetaRecordRelation findUniqueOrThrow
   */
  export type MetaRecordRelationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecordRelation to fetch.
     */
    where: MetaRecordRelationWhereUniqueInput
  }

  /**
   * MetaRecordRelation findFirst
   */
  export type MetaRecordRelationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecordRelation to fetch.
     */
    where?: MetaRecordRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaRecordRelations to fetch.
     */
    orderBy?: MetaRecordRelationOrderByWithRelationInput | MetaRecordRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaRecordRelations.
     */
    cursor?: MetaRecordRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaRecordRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaRecordRelations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaRecordRelations.
     */
    distinct?: MetaRecordRelationScalarFieldEnum | MetaRecordRelationScalarFieldEnum[]
  }

  /**
   * MetaRecordRelation findFirstOrThrow
   */
  export type MetaRecordRelationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecordRelation to fetch.
     */
    where?: MetaRecordRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaRecordRelations to fetch.
     */
    orderBy?: MetaRecordRelationOrderByWithRelationInput | MetaRecordRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaRecordRelations.
     */
    cursor?: MetaRecordRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaRecordRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaRecordRelations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaRecordRelations.
     */
    distinct?: MetaRecordRelationScalarFieldEnum | MetaRecordRelationScalarFieldEnum[]
  }

  /**
   * MetaRecordRelation findMany
   */
  export type MetaRecordRelationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    /**
     * Filter, which MetaRecordRelations to fetch.
     */
    where?: MetaRecordRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaRecordRelations to fetch.
     */
    orderBy?: MetaRecordRelationOrderByWithRelationInput | MetaRecordRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetaRecordRelations.
     */
    cursor?: MetaRecordRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaRecordRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaRecordRelations.
     */
    skip?: number
    distinct?: MetaRecordRelationScalarFieldEnum | MetaRecordRelationScalarFieldEnum[]
  }

  /**
   * MetaRecordRelation create
   */
  export type MetaRecordRelationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    /**
     * The data needed to create a MetaRecordRelation.
     */
    data: XOR<MetaRecordRelationCreateInput, MetaRecordRelationUncheckedCreateInput>
  }

  /**
   * MetaRecordRelation createMany
   */
  export type MetaRecordRelationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetaRecordRelations.
     */
    data: MetaRecordRelationCreateManyInput | MetaRecordRelationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetaRecordRelation createManyAndReturn
   */
  export type MetaRecordRelationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * The data used to create many MetaRecordRelations.
     */
    data: MetaRecordRelationCreateManyInput | MetaRecordRelationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetaRecordRelation update
   */
  export type MetaRecordRelationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    /**
     * The data needed to update a MetaRecordRelation.
     */
    data: XOR<MetaRecordRelationUpdateInput, MetaRecordRelationUncheckedUpdateInput>
    /**
     * Choose, which MetaRecordRelation to update.
     */
    where: MetaRecordRelationWhereUniqueInput
  }

  /**
   * MetaRecordRelation updateMany
   */
  export type MetaRecordRelationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetaRecordRelations.
     */
    data: XOR<MetaRecordRelationUpdateManyMutationInput, MetaRecordRelationUncheckedUpdateManyInput>
    /**
     * Filter which MetaRecordRelations to update
     */
    where?: MetaRecordRelationWhereInput
    /**
     * Limit how many MetaRecordRelations to update.
     */
    limit?: number
  }

  /**
   * MetaRecordRelation updateManyAndReturn
   */
  export type MetaRecordRelationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * The data used to update MetaRecordRelations.
     */
    data: XOR<MetaRecordRelationUpdateManyMutationInput, MetaRecordRelationUncheckedUpdateManyInput>
    /**
     * Filter which MetaRecordRelations to update
     */
    where?: MetaRecordRelationWhereInput
    /**
     * Limit how many MetaRecordRelations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetaRecordRelation upsert
   */
  export type MetaRecordRelationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    /**
     * The filter to search for the MetaRecordRelation to update in case it exists.
     */
    where: MetaRecordRelationWhereUniqueInput
    /**
     * In case the MetaRecordRelation found by the `where` argument doesn't exist, create a new MetaRecordRelation with this data.
     */
    create: XOR<MetaRecordRelationCreateInput, MetaRecordRelationUncheckedCreateInput>
    /**
     * In case the MetaRecordRelation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetaRecordRelationUpdateInput, MetaRecordRelationUncheckedUpdateInput>
  }

  /**
   * MetaRecordRelation delete
   */
  export type MetaRecordRelationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
    /**
     * Filter which MetaRecordRelation to delete.
     */
    where: MetaRecordRelationWhereUniqueInput
  }

  /**
   * MetaRecordRelation deleteMany
   */
  export type MetaRecordRelationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaRecordRelations to delete
     */
    where?: MetaRecordRelationWhereInput
    /**
     * Limit how many MetaRecordRelations to delete.
     */
    limit?: number
  }

  /**
   * MetaRecordRelation without action
   */
  export type MetaRecordRelationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaRecordRelation
     */
    select?: MetaRecordRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaRecordRelation
     */
    omit?: MetaRecordRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetaRecordRelationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MetaEntityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    title: 'title',
    description: 'description',
    readonly: 'readonly',
    type: 'type',
    hidden: 'hidden',
    order: 'order',
    roleable: 'roleable',
    disable: 'disable',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MetaEntityScalarFieldEnum = (typeof MetaEntityScalarFieldEnum)[keyof typeof MetaEntityScalarFieldEnum]


  export const MetaAttributeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    name: 'name',
    description: 'description',
    multiple: 'multiple',
    type: 'type',
    required: 'required',
    readonly: 'readonly',
    order: 'order',
    disable: 'disable',
    hash: 'hash',
    default: 'default',
    role: 'role',
    security: 'security',
    field: 'field',
    entityId: 'entityId',
    relationId: 'relationId',
    relationName: 'relationName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MetaAttributeScalarFieldEnum = (typeof MetaAttributeScalarFieldEnum)[keyof typeof MetaAttributeScalarFieldEnum]


  export const MetaRecordScalarFieldEnum: {
    id: 'id',
    entityId: 'entityId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MetaRecordScalarFieldEnum = (typeof MetaRecordScalarFieldEnum)[keyof typeof MetaRecordScalarFieldEnum]


  export const MetaValueScalarFieldEnum: {
    parentId: 'parentId',
    name: 'name',
    attributeId: 'attributeId',
    type: 'type',
    childrenProperty: 'childrenProperty',
    order: 'order',
    bit: 'bit',
    tinyint: 'tinyint',
    smallint: 'smallint',
    int: 'int',
    bigint: 'bigint',
    float: 'float',
    date: 'date',
    time: 'time',
    datetime: 'datetime',
    varchar: 'varchar',
    text: 'text',
    json: 'json',
    blob: 'blob',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MetaValueScalarFieldEnum = (typeof MetaValueScalarFieldEnum)[keyof typeof MetaValueScalarFieldEnum]


  export const MetaRecordRelationScalarFieldEnum: {
    valueParentId: 'valueParentId',
    valueName: 'valueName',
    recordId: 'recordId'
  };

  export type MetaRecordRelationScalarFieldEnum = (typeof MetaRecordRelationScalarFieldEnum)[keyof typeof MetaRecordRelationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    
  /**
   * Deep Input Types
   */


  export type MetaEntityWhereInput = {
    AND?: MetaEntityWhereInput | MetaEntityWhereInput[]
    OR?: MetaEntityWhereInput[]
    NOT?: MetaEntityWhereInput | MetaEntityWhereInput[]
    id?: StringFilter<"MetaEntity"> | string
    name?: StringNullableFilter<"MetaEntity"> | string | null
    title?: StringNullableFilter<"MetaEntity"> | string | null
    description?: StringNullableFilter<"MetaEntity"> | string | null
    readonly?: BoolNullableFilter<"MetaEntity"> | boolean | null
    type?: StringNullableFilter<"MetaEntity"> | string | null
    hidden?: BoolNullableFilter<"MetaEntity"> | boolean | null
    order?: IntNullableFilter<"MetaEntity"> | number | null
    roleable?: BoolNullableFilter<"MetaEntity"> | boolean | null
    disable?: BoolNullableFilter<"MetaEntity"> | boolean | null
    createdAt?: DateTimeFilter<"MetaEntity"> | Date | string
    updatedAt?: DateTimeFilter<"MetaEntity"> | Date | string
    relations?: MetaAttributeListRelationFilter
    records?: MetaRecordListRelationFilter
    children?: MetaAttributeListRelationFilter
  }

  export type MetaEntityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    readonly?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    hidden?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    roleable?: SortOrderInput | SortOrder
    disable?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    relations?: MetaAttributeOrderByRelationAggregateInput
    records?: MetaRecordOrderByRelationAggregateInput
    children?: MetaAttributeOrderByRelationAggregateInput
  }

  export type MetaEntityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MetaEntityWhereInput | MetaEntityWhereInput[]
    OR?: MetaEntityWhereInput[]
    NOT?: MetaEntityWhereInput | MetaEntityWhereInput[]
    name?: StringNullableFilter<"MetaEntity"> | string | null
    title?: StringNullableFilter<"MetaEntity"> | string | null
    description?: StringNullableFilter<"MetaEntity"> | string | null
    readonly?: BoolNullableFilter<"MetaEntity"> | boolean | null
    type?: StringNullableFilter<"MetaEntity"> | string | null
    hidden?: BoolNullableFilter<"MetaEntity"> | boolean | null
    order?: IntNullableFilter<"MetaEntity"> | number | null
    roleable?: BoolNullableFilter<"MetaEntity"> | boolean | null
    disable?: BoolNullableFilter<"MetaEntity"> | boolean | null
    createdAt?: DateTimeFilter<"MetaEntity"> | Date | string
    updatedAt?: DateTimeFilter<"MetaEntity"> | Date | string
    relations?: MetaAttributeListRelationFilter
    records?: MetaRecordListRelationFilter
    children?: MetaAttributeListRelationFilter
  }, "id">

  export type MetaEntityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    readonly?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    hidden?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    roleable?: SortOrderInput | SortOrder
    disable?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MetaEntityCountOrderByAggregateInput
    _avg?: MetaEntityAvgOrderByAggregateInput
    _max?: MetaEntityMaxOrderByAggregateInput
    _min?: MetaEntityMinOrderByAggregateInput
    _sum?: MetaEntitySumOrderByAggregateInput
  }

  export type MetaEntityScalarWhereWithAggregatesInput = {
    AND?: MetaEntityScalarWhereWithAggregatesInput | MetaEntityScalarWhereWithAggregatesInput[]
    OR?: MetaEntityScalarWhereWithAggregatesInput[]
    NOT?: MetaEntityScalarWhereWithAggregatesInput | MetaEntityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MetaEntity"> | string
    name?: StringNullableWithAggregatesFilter<"MetaEntity"> | string | null
    title?: StringNullableWithAggregatesFilter<"MetaEntity"> | string | null
    description?: StringNullableWithAggregatesFilter<"MetaEntity"> | string | null
    readonly?: BoolNullableWithAggregatesFilter<"MetaEntity"> | boolean | null
    type?: StringNullableWithAggregatesFilter<"MetaEntity"> | string | null
    hidden?: BoolNullableWithAggregatesFilter<"MetaEntity"> | boolean | null
    order?: IntNullableWithAggregatesFilter<"MetaEntity"> | number | null
    roleable?: BoolNullableWithAggregatesFilter<"MetaEntity"> | boolean | null
    disable?: BoolNullableWithAggregatesFilter<"MetaEntity"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"MetaEntity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MetaEntity"> | Date | string
  }

  export type MetaAttributeWhereInput = {
    AND?: MetaAttributeWhereInput | MetaAttributeWhereInput[]
    OR?: MetaAttributeWhereInput[]
    NOT?: MetaAttributeWhereInput | MetaAttributeWhereInput[]
    id?: StringFilter<"MetaAttribute"> | string
    title?: StringNullableFilter<"MetaAttribute"> | string | null
    name?: StringFilter<"MetaAttribute"> | string
    description?: StringNullableFilter<"MetaAttribute"> | string | null
    multiple?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    type?: StringNullableFilter<"MetaAttribute"> | string | null
    required?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    readonly?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    order?: IntNullableFilter<"MetaAttribute"> | number | null
    disable?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    hash?: StringNullableFilter<"MetaAttribute"> | string | null
    default?: StringNullableFilter<"MetaAttribute"> | string | null
    role?: IntNullableFilter<"MetaAttribute"> | number | null
    security?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    field?: StringNullableFilter<"MetaAttribute"> | string | null
    entityId?: StringNullableFilter<"MetaAttribute"> | string | null
    relationId?: StringNullableFilter<"MetaAttribute"> | string | null
    relationName?: StringNullableFilter<"MetaAttribute"> | string | null
    createdAt?: DateTimeFilter<"MetaAttribute"> | Date | string
    updatedAt?: DateTimeFilter<"MetaAttribute"> | Date | string
    values?: MetaValueListRelationFilter
    entity?: XOR<MetaEntityNullableScalarRelationFilter, MetaEntityWhereInput> | null
    relation?: XOR<MetaEntityNullableScalarRelationFilter, MetaEntityWhereInput> | null
  }

  export type MetaAttributeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    multiple?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    required?: SortOrderInput | SortOrder
    readonly?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    disable?: SortOrderInput | SortOrder
    hash?: SortOrderInput | SortOrder
    default?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    security?: SortOrderInput | SortOrder
    field?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    relationId?: SortOrderInput | SortOrder
    relationName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    values?: MetaValueOrderByRelationAggregateInput
    entity?: MetaEntityOrderByWithRelationInput
    relation?: MetaEntityOrderByWithRelationInput
  }

  export type MetaAttributeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MetaAttributeWhereInput | MetaAttributeWhereInput[]
    OR?: MetaAttributeWhereInput[]
    NOT?: MetaAttributeWhereInput | MetaAttributeWhereInput[]
    title?: StringNullableFilter<"MetaAttribute"> | string | null
    name?: StringFilter<"MetaAttribute"> | string
    description?: StringNullableFilter<"MetaAttribute"> | string | null
    multiple?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    type?: StringNullableFilter<"MetaAttribute"> | string | null
    required?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    readonly?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    order?: IntNullableFilter<"MetaAttribute"> | number | null
    disable?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    hash?: StringNullableFilter<"MetaAttribute"> | string | null
    default?: StringNullableFilter<"MetaAttribute"> | string | null
    role?: IntNullableFilter<"MetaAttribute"> | number | null
    security?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    field?: StringNullableFilter<"MetaAttribute"> | string | null
    entityId?: StringNullableFilter<"MetaAttribute"> | string | null
    relationId?: StringNullableFilter<"MetaAttribute"> | string | null
    relationName?: StringNullableFilter<"MetaAttribute"> | string | null
    createdAt?: DateTimeFilter<"MetaAttribute"> | Date | string
    updatedAt?: DateTimeFilter<"MetaAttribute"> | Date | string
    values?: MetaValueListRelationFilter
    entity?: XOR<MetaEntityNullableScalarRelationFilter, MetaEntityWhereInput> | null
    relation?: XOR<MetaEntityNullableScalarRelationFilter, MetaEntityWhereInput> | null
  }, "id">

  export type MetaAttributeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    multiple?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    required?: SortOrderInput | SortOrder
    readonly?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    disable?: SortOrderInput | SortOrder
    hash?: SortOrderInput | SortOrder
    default?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    security?: SortOrderInput | SortOrder
    field?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    relationId?: SortOrderInput | SortOrder
    relationName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MetaAttributeCountOrderByAggregateInput
    _avg?: MetaAttributeAvgOrderByAggregateInput
    _max?: MetaAttributeMaxOrderByAggregateInput
    _min?: MetaAttributeMinOrderByAggregateInput
    _sum?: MetaAttributeSumOrderByAggregateInput
  }

  export type MetaAttributeScalarWhereWithAggregatesInput = {
    AND?: MetaAttributeScalarWhereWithAggregatesInput | MetaAttributeScalarWhereWithAggregatesInput[]
    OR?: MetaAttributeScalarWhereWithAggregatesInput[]
    NOT?: MetaAttributeScalarWhereWithAggregatesInput | MetaAttributeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MetaAttribute"> | string
    title?: StringNullableWithAggregatesFilter<"MetaAttribute"> | string | null
    name?: StringWithAggregatesFilter<"MetaAttribute"> | string
    description?: StringNullableWithAggregatesFilter<"MetaAttribute"> | string | null
    multiple?: BoolNullableWithAggregatesFilter<"MetaAttribute"> | boolean | null
    type?: StringNullableWithAggregatesFilter<"MetaAttribute"> | string | null
    required?: BoolNullableWithAggregatesFilter<"MetaAttribute"> | boolean | null
    readonly?: BoolNullableWithAggregatesFilter<"MetaAttribute"> | boolean | null
    order?: IntNullableWithAggregatesFilter<"MetaAttribute"> | number | null
    disable?: BoolNullableWithAggregatesFilter<"MetaAttribute"> | boolean | null
    hash?: StringNullableWithAggregatesFilter<"MetaAttribute"> | string | null
    default?: StringNullableWithAggregatesFilter<"MetaAttribute"> | string | null
    role?: IntNullableWithAggregatesFilter<"MetaAttribute"> | number | null
    security?: BoolNullableWithAggregatesFilter<"MetaAttribute"> | boolean | null
    field?: StringNullableWithAggregatesFilter<"MetaAttribute"> | string | null
    entityId?: StringNullableWithAggregatesFilter<"MetaAttribute"> | string | null
    relationId?: StringNullableWithAggregatesFilter<"MetaAttribute"> | string | null
    relationName?: StringNullableWithAggregatesFilter<"MetaAttribute"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MetaAttribute"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MetaAttribute"> | Date | string
  }

  export type MetaRecordWhereInput = {
    AND?: MetaRecordWhereInput | MetaRecordWhereInput[]
    OR?: MetaRecordWhereInput[]
    NOT?: MetaRecordWhereInput | MetaRecordWhereInput[]
    id?: StringFilter<"MetaRecord"> | string
    entityId?: StringNullableFilter<"MetaRecord"> | string | null
    createdAt?: DateTimeFilter<"MetaRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MetaRecord"> | Date | string
    entity?: XOR<MetaEntityNullableScalarRelationFilter, MetaEntityWhereInput> | null
    parent?: MetaRecordRelationListRelationFilter
    value?: MetaValueListRelationFilter
  }

  export type MetaRecordOrderByWithRelationInput = {
    id?: SortOrder
    entityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entity?: MetaEntityOrderByWithRelationInput
    parent?: MetaRecordRelationOrderByRelationAggregateInput
    value?: MetaValueOrderByRelationAggregateInput
  }

  export type MetaRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MetaRecordWhereInput | MetaRecordWhereInput[]
    OR?: MetaRecordWhereInput[]
    NOT?: MetaRecordWhereInput | MetaRecordWhereInput[]
    entityId?: StringNullableFilter<"MetaRecord"> | string | null
    createdAt?: DateTimeFilter<"MetaRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MetaRecord"> | Date | string
    entity?: XOR<MetaEntityNullableScalarRelationFilter, MetaEntityWhereInput> | null
    parent?: MetaRecordRelationListRelationFilter
    value?: MetaValueListRelationFilter
  }, "id">

  export type MetaRecordOrderByWithAggregationInput = {
    id?: SortOrder
    entityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MetaRecordCountOrderByAggregateInput
    _max?: MetaRecordMaxOrderByAggregateInput
    _min?: MetaRecordMinOrderByAggregateInput
  }

  export type MetaRecordScalarWhereWithAggregatesInput = {
    AND?: MetaRecordScalarWhereWithAggregatesInput | MetaRecordScalarWhereWithAggregatesInput[]
    OR?: MetaRecordScalarWhereWithAggregatesInput[]
    NOT?: MetaRecordScalarWhereWithAggregatesInput | MetaRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MetaRecord"> | string
    entityId?: StringNullableWithAggregatesFilter<"MetaRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MetaRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MetaRecord"> | Date | string
  }

  export type MetaValueWhereInput = {
    AND?: MetaValueWhereInput | MetaValueWhereInput[]
    OR?: MetaValueWhereInput[]
    NOT?: MetaValueWhereInput | MetaValueWhereInput[]
    parentId?: StringFilter<"MetaValue"> | string
    name?: StringFilter<"MetaValue"> | string
    attributeId?: StringNullableFilter<"MetaValue"> | string | null
    type?: IntFilter<"MetaValue"> | number
    childrenProperty?: StringNullableFilter<"MetaValue"> | string | null
    order?: IntNullableFilter<"MetaValue"> | number | null
    bit?: IntNullableFilter<"MetaValue"> | number | null
    tinyint?: IntNullableFilter<"MetaValue"> | number | null
    smallint?: IntNullableFilter<"MetaValue"> | number | null
    int?: IntNullableFilter<"MetaValue"> | number | null
    bigint?: BigIntNullableFilter<"MetaValue"> | bigint | number | null
    float?: FloatNullableFilter<"MetaValue"> | number | null
    date?: DateTimeNullableFilter<"MetaValue"> | Date | string | null
    time?: DateTimeNullableFilter<"MetaValue"> | Date | string | null
    datetime?: DateTimeNullableFilter<"MetaValue"> | Date | string | null
    varchar?: StringNullableFilter<"MetaValue"> | string | null
    text?: StringNullableFilter<"MetaValue"> | string | null
    json?: JsonNullableFilter<"MetaValue">
    blob?: BytesNullableFilter<"MetaValue"> | Bytes | null
    createdAt?: DateTimeFilter<"MetaValue"> | Date | string
    updatedAt?: DateTimeFilter<"MetaValue"> | Date | string
    parent?: XOR<MetaRecordScalarRelationFilter, MetaRecordWhereInput>
    attribute?: XOR<MetaAttributeNullableScalarRelationFilter, MetaAttributeWhereInput> | null
    children?: MetaRecordRelationListRelationFilter
  }

  export type MetaValueOrderByWithRelationInput = {
    parentId?: SortOrder
    name?: SortOrder
    attributeId?: SortOrderInput | SortOrder
    type?: SortOrder
    childrenProperty?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    bit?: SortOrderInput | SortOrder
    tinyint?: SortOrderInput | SortOrder
    smallint?: SortOrderInput | SortOrder
    int?: SortOrderInput | SortOrder
    bigint?: SortOrderInput | SortOrder
    float?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    datetime?: SortOrderInput | SortOrder
    varchar?: SortOrderInput | SortOrder
    text?: SortOrderInput | SortOrder
    json?: SortOrderInput | SortOrder
    blob?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parent?: MetaRecordOrderByWithRelationInput
    attribute?: MetaAttributeOrderByWithRelationInput
    children?: MetaRecordRelationOrderByRelationAggregateInput
  }

  export type MetaValueWhereUniqueInput = Prisma.AtLeast<{
    parentId_name?: MetaValueParentIdNameCompoundUniqueInput
    AND?: MetaValueWhereInput | MetaValueWhereInput[]
    OR?: MetaValueWhereInput[]
    NOT?: MetaValueWhereInput | MetaValueWhereInput[]
    parentId?: StringFilter<"MetaValue"> | string
    name?: StringFilter<"MetaValue"> | string
    attributeId?: StringNullableFilter<"MetaValue"> | string | null
    type?: IntFilter<"MetaValue"> | number
    childrenProperty?: StringNullableFilter<"MetaValue"> | string | null
    order?: IntNullableFilter<"MetaValue"> | number | null
    bit?: IntNullableFilter<"MetaValue"> | number | null
    tinyint?: IntNullableFilter<"MetaValue"> | number | null
    smallint?: IntNullableFilter<"MetaValue"> | number | null
    int?: IntNullableFilter<"MetaValue"> | number | null
    bigint?: BigIntNullableFilter<"MetaValue"> | bigint | number | null
    float?: FloatNullableFilter<"MetaValue"> | number | null
    date?: DateTimeNullableFilter<"MetaValue"> | Date | string | null
    time?: DateTimeNullableFilter<"MetaValue"> | Date | string | null
    datetime?: DateTimeNullableFilter<"MetaValue"> | Date | string | null
    varchar?: StringNullableFilter<"MetaValue"> | string | null
    text?: StringNullableFilter<"MetaValue"> | string | null
    json?: JsonNullableFilter<"MetaValue">
    blob?: BytesNullableFilter<"MetaValue"> | Bytes | null
    createdAt?: DateTimeFilter<"MetaValue"> | Date | string
    updatedAt?: DateTimeFilter<"MetaValue"> | Date | string
    parent?: XOR<MetaRecordScalarRelationFilter, MetaRecordWhereInput>
    attribute?: XOR<MetaAttributeNullableScalarRelationFilter, MetaAttributeWhereInput> | null
    children?: MetaRecordRelationListRelationFilter
  }, "parentId_name">

  export type MetaValueOrderByWithAggregationInput = {
    parentId?: SortOrder
    name?: SortOrder
    attributeId?: SortOrderInput | SortOrder
    type?: SortOrder
    childrenProperty?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    bit?: SortOrderInput | SortOrder
    tinyint?: SortOrderInput | SortOrder
    smallint?: SortOrderInput | SortOrder
    int?: SortOrderInput | SortOrder
    bigint?: SortOrderInput | SortOrder
    float?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    datetime?: SortOrderInput | SortOrder
    varchar?: SortOrderInput | SortOrder
    text?: SortOrderInput | SortOrder
    json?: SortOrderInput | SortOrder
    blob?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MetaValueCountOrderByAggregateInput
    _avg?: MetaValueAvgOrderByAggregateInput
    _max?: MetaValueMaxOrderByAggregateInput
    _min?: MetaValueMinOrderByAggregateInput
    _sum?: MetaValueSumOrderByAggregateInput
  }

  export type MetaValueScalarWhereWithAggregatesInput = {
    AND?: MetaValueScalarWhereWithAggregatesInput | MetaValueScalarWhereWithAggregatesInput[]
    OR?: MetaValueScalarWhereWithAggregatesInput[]
    NOT?: MetaValueScalarWhereWithAggregatesInput | MetaValueScalarWhereWithAggregatesInput[]
    parentId?: StringWithAggregatesFilter<"MetaValue"> | string
    name?: StringWithAggregatesFilter<"MetaValue"> | string
    attributeId?: StringNullableWithAggregatesFilter<"MetaValue"> | string | null
    type?: IntWithAggregatesFilter<"MetaValue"> | number
    childrenProperty?: StringNullableWithAggregatesFilter<"MetaValue"> | string | null
    order?: IntNullableWithAggregatesFilter<"MetaValue"> | number | null
    bit?: IntNullableWithAggregatesFilter<"MetaValue"> | number | null
    tinyint?: IntNullableWithAggregatesFilter<"MetaValue"> | number | null
    smallint?: IntNullableWithAggregatesFilter<"MetaValue"> | number | null
    int?: IntNullableWithAggregatesFilter<"MetaValue"> | number | null
    bigint?: BigIntNullableWithAggregatesFilter<"MetaValue"> | bigint | number | null
    float?: FloatNullableWithAggregatesFilter<"MetaValue"> | number | null
    date?: DateTimeNullableWithAggregatesFilter<"MetaValue"> | Date | string | null
    time?: DateTimeNullableWithAggregatesFilter<"MetaValue"> | Date | string | null
    datetime?: DateTimeNullableWithAggregatesFilter<"MetaValue"> | Date | string | null
    varchar?: StringNullableWithAggregatesFilter<"MetaValue"> | string | null
    text?: StringNullableWithAggregatesFilter<"MetaValue"> | string | null
    json?: JsonNullableWithAggregatesFilter<"MetaValue">
    blob?: BytesNullableWithAggregatesFilter<"MetaValue"> | Bytes | null
    createdAt?: DateTimeWithAggregatesFilter<"MetaValue"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MetaValue"> | Date | string
  }

  export type MetaRecordRelationWhereInput = {
    AND?: MetaRecordRelationWhereInput | MetaRecordRelationWhereInput[]
    OR?: MetaRecordRelationWhereInput[]
    NOT?: MetaRecordRelationWhereInput | MetaRecordRelationWhereInput[]
    valueParentId?: StringFilter<"MetaRecordRelation"> | string
    valueName?: StringFilter<"MetaRecordRelation"> | string
    recordId?: StringFilter<"MetaRecordRelation"> | string
    value?: XOR<MetaValueScalarRelationFilter, MetaValueWhereInput>
    record?: XOR<MetaRecordScalarRelationFilter, MetaRecordWhereInput>
  }

  export type MetaRecordRelationOrderByWithRelationInput = {
    valueParentId?: SortOrder
    valueName?: SortOrder
    recordId?: SortOrder
    value?: MetaValueOrderByWithRelationInput
    record?: MetaRecordOrderByWithRelationInput
  }

  export type MetaRecordRelationWhereUniqueInput = Prisma.AtLeast<{
    valueParentId_valueName_recordId?: MetaRecordRelationValueParentIdValueNameRecordIdCompoundUniqueInput
    AND?: MetaRecordRelationWhereInput | MetaRecordRelationWhereInput[]
    OR?: MetaRecordRelationWhereInput[]
    NOT?: MetaRecordRelationWhereInput | MetaRecordRelationWhereInput[]
    valueParentId?: StringFilter<"MetaRecordRelation"> | string
    valueName?: StringFilter<"MetaRecordRelation"> | string
    recordId?: StringFilter<"MetaRecordRelation"> | string
    value?: XOR<MetaValueScalarRelationFilter, MetaValueWhereInput>
    record?: XOR<MetaRecordScalarRelationFilter, MetaRecordWhereInput>
  }, "valueParentId_valueName_recordId">

  export type MetaRecordRelationOrderByWithAggregationInput = {
    valueParentId?: SortOrder
    valueName?: SortOrder
    recordId?: SortOrder
    _count?: MetaRecordRelationCountOrderByAggregateInput
    _max?: MetaRecordRelationMaxOrderByAggregateInput
    _min?: MetaRecordRelationMinOrderByAggregateInput
  }

  export type MetaRecordRelationScalarWhereWithAggregatesInput = {
    AND?: MetaRecordRelationScalarWhereWithAggregatesInput | MetaRecordRelationScalarWhereWithAggregatesInput[]
    OR?: MetaRecordRelationScalarWhereWithAggregatesInput[]
    NOT?: MetaRecordRelationScalarWhereWithAggregatesInput | MetaRecordRelationScalarWhereWithAggregatesInput[]
    valueParentId?: StringWithAggregatesFilter<"MetaRecordRelation"> | string
    valueName?: StringWithAggregatesFilter<"MetaRecordRelation"> | string
    recordId?: StringWithAggregatesFilter<"MetaRecordRelation"> | string
  }

  export type MetaEntityCreateInput = {
    id?: string
    name?: string | null
    title?: string | null
    description?: string | null
    readonly?: boolean | null
    type?: string | null
    hidden?: boolean | null
    order?: number | null
    roleable?: boolean | null
    disable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    relations?: MetaAttributeCreateNestedManyWithoutRelationInput
    records?: MetaRecordCreateNestedManyWithoutEntityInput
    children?: MetaAttributeCreateNestedManyWithoutEntityInput
  }

  export type MetaEntityUncheckedCreateInput = {
    id?: string
    name?: string | null
    title?: string | null
    description?: string | null
    readonly?: boolean | null
    type?: string | null
    hidden?: boolean | null
    order?: number | null
    roleable?: boolean | null
    disable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    relations?: MetaAttributeUncheckedCreateNestedManyWithoutRelationInput
    records?: MetaRecordUncheckedCreateNestedManyWithoutEntityInput
    children?: MetaAttributeUncheckedCreateNestedManyWithoutEntityInput
  }

  export type MetaEntityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relations?: MetaAttributeUpdateManyWithoutRelationNestedInput
    records?: MetaRecordUpdateManyWithoutEntityNestedInput
    children?: MetaAttributeUpdateManyWithoutEntityNestedInput
  }

  export type MetaEntityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relations?: MetaAttributeUncheckedUpdateManyWithoutRelationNestedInput
    records?: MetaRecordUncheckedUpdateManyWithoutEntityNestedInput
    children?: MetaAttributeUncheckedUpdateManyWithoutEntityNestedInput
  }

  export type MetaEntityCreateManyInput = {
    id?: string
    name?: string | null
    title?: string | null
    description?: string | null
    readonly?: boolean | null
    type?: string | null
    hidden?: boolean | null
    order?: number | null
    roleable?: boolean | null
    disable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaEntityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaEntityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaAttributeCreateInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    values?: MetaValueCreateNestedManyWithoutAttributeInput
    entity?: MetaEntityCreateNestedOneWithoutChildrenInput
    relation?: MetaEntityCreateNestedOneWithoutRelationsInput
  }

  export type MetaAttributeUncheckedCreateInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    entityId?: string | null
    relationId?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    values?: MetaValueUncheckedCreateNestedManyWithoutAttributeInput
  }

  export type MetaAttributeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    values?: MetaValueUpdateManyWithoutAttributeNestedInput
    entity?: MetaEntityUpdateOneWithoutChildrenNestedInput
    relation?: MetaEntityUpdateOneWithoutRelationsNestedInput
  }

  export type MetaAttributeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    relationId?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    values?: MetaValueUncheckedUpdateManyWithoutAttributeNestedInput
  }

  export type MetaAttributeCreateManyInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    entityId?: string | null
    relationId?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaAttributeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaAttributeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    relationId?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaRecordCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entity?: MetaEntityCreateNestedOneWithoutRecordsInput
    parent?: MetaRecordRelationCreateNestedManyWithoutRecordInput
    value?: MetaValueCreateNestedManyWithoutParentInput
  }

  export type MetaRecordUncheckedCreateInput = {
    id?: string
    entityId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: MetaRecordRelationUncheckedCreateNestedManyWithoutRecordInput
    value?: MetaValueUncheckedCreateNestedManyWithoutParentInput
  }

  export type MetaRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entity?: MetaEntityUpdateOneWithoutRecordsNestedInput
    parent?: MetaRecordRelationUpdateManyWithoutRecordNestedInput
    value?: MetaValueUpdateManyWithoutParentNestedInput
  }

  export type MetaRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: MetaRecordRelationUncheckedUpdateManyWithoutRecordNestedInput
    value?: MetaValueUncheckedUpdateManyWithoutParentNestedInput
  }

  export type MetaRecordCreateManyInput = {
    id?: string
    entityId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaValueCreateInput = {
    name: string
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: MetaRecordCreateNestedOneWithoutValueInput
    attribute?: MetaAttributeCreateNestedOneWithoutValuesInput
    children?: MetaRecordRelationCreateNestedManyWithoutValueInput
  }

  export type MetaValueUncheckedCreateInput = {
    parentId: string
    name: string
    attributeId?: string | null
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: MetaRecordRelationUncheckedCreateNestedManyWithoutValueInput
  }

  export type MetaValueUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: MetaRecordUpdateOneRequiredWithoutValueNestedInput
    attribute?: MetaAttributeUpdateOneWithoutValuesNestedInput
    children?: MetaRecordRelationUpdateManyWithoutValueNestedInput
  }

  export type MetaValueUncheckedUpdateInput = {
    parentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    attributeId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: MetaRecordRelationUncheckedUpdateManyWithoutValueNestedInput
  }

  export type MetaValueCreateManyInput = {
    parentId: string
    name: string
    attributeId?: string | null
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaValueUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaValueUncheckedUpdateManyInput = {
    parentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    attributeId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaRecordRelationCreateInput = {
    value: MetaValueCreateNestedOneWithoutChildrenInput
    record: MetaRecordCreateNestedOneWithoutParentInput
  }

  export type MetaRecordRelationUncheckedCreateInput = {
    valueParentId: string
    valueName: string
    recordId: string
  }

  export type MetaRecordRelationUpdateInput = {
    value?: MetaValueUpdateOneRequiredWithoutChildrenNestedInput
    record?: MetaRecordUpdateOneRequiredWithoutParentNestedInput
  }

  export type MetaRecordRelationUncheckedUpdateInput = {
    valueParentId?: StringFieldUpdateOperationsInput | string
    valueName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
  }

  export type MetaRecordRelationCreateManyInput = {
    valueParentId: string
    valueName: string
    recordId: string
  }

  export type MetaRecordRelationUpdateManyMutationInput = {

  }

  export type MetaRecordRelationUncheckedUpdateManyInput = {
    valueParentId?: StringFieldUpdateOperationsInput | string
    valueName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MetaAttributeListRelationFilter = {
    every?: MetaAttributeWhereInput
    some?: MetaAttributeWhereInput
    none?: MetaAttributeWhereInput
  }

  export type MetaRecordListRelationFilter = {
    every?: MetaRecordWhereInput
    some?: MetaRecordWhereInput
    none?: MetaRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MetaAttributeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MetaRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MetaEntityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    description?: SortOrder
    readonly?: SortOrder
    type?: SortOrder
    hidden?: SortOrder
    order?: SortOrder
    roleable?: SortOrder
    disable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaEntityAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type MetaEntityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    description?: SortOrder
    readonly?: SortOrder
    type?: SortOrder
    hidden?: SortOrder
    order?: SortOrder
    roleable?: SortOrder
    disable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaEntityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    description?: SortOrder
    readonly?: SortOrder
    type?: SortOrder
    hidden?: SortOrder
    order?: SortOrder
    roleable?: SortOrder
    disable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaEntitySumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type MetaValueListRelationFilter = {
    every?: MetaValueWhereInput
    some?: MetaValueWhereInput
    none?: MetaValueWhereInput
  }

  export type MetaEntityNullableScalarRelationFilter = {
    is?: MetaEntityWhereInput | null
    isNot?: MetaEntityWhereInput | null
  }

  export type MetaValueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MetaAttributeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    name?: SortOrder
    description?: SortOrder
    multiple?: SortOrder
    type?: SortOrder
    required?: SortOrder
    readonly?: SortOrder
    order?: SortOrder
    disable?: SortOrder
    hash?: SortOrder
    default?: SortOrder
    role?: SortOrder
    security?: SortOrder
    field?: SortOrder
    entityId?: SortOrder
    relationId?: SortOrder
    relationName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaAttributeAvgOrderByAggregateInput = {
    order?: SortOrder
    role?: SortOrder
  }

  export type MetaAttributeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    name?: SortOrder
    description?: SortOrder
    multiple?: SortOrder
    type?: SortOrder
    required?: SortOrder
    readonly?: SortOrder
    order?: SortOrder
    disable?: SortOrder
    hash?: SortOrder
    default?: SortOrder
    role?: SortOrder
    security?: SortOrder
    field?: SortOrder
    entityId?: SortOrder
    relationId?: SortOrder
    relationName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaAttributeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    name?: SortOrder
    description?: SortOrder
    multiple?: SortOrder
    type?: SortOrder
    required?: SortOrder
    readonly?: SortOrder
    order?: SortOrder
    disable?: SortOrder
    hash?: SortOrder
    default?: SortOrder
    role?: SortOrder
    security?: SortOrder
    field?: SortOrder
    entityId?: SortOrder
    relationId?: SortOrder
    relationName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaAttributeSumOrderByAggregateInput = {
    order?: SortOrder
    role?: SortOrder
  }

  export type MetaRecordRelationListRelationFilter = {
    every?: MetaRecordRelationWhereInput
    some?: MetaRecordRelationWhereInput
    none?: MetaRecordRelationWhereInput
  }

  export type MetaRecordRelationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MetaRecordCountOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaRecordMinOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type MetaRecordScalarRelationFilter = {
    is?: MetaRecordWhereInput
    isNot?: MetaRecordWhereInput
  }

  export type MetaAttributeNullableScalarRelationFilter = {
    is?: MetaAttributeWhereInput | null
    isNot?: MetaAttributeWhereInput | null
  }

  export type MetaValueParentIdNameCompoundUniqueInput = {
    parentId: string
    name: string
  }

  export type MetaValueCountOrderByAggregateInput = {
    parentId?: SortOrder
    name?: SortOrder
    attributeId?: SortOrder
    type?: SortOrder
    childrenProperty?: SortOrder
    order?: SortOrder
    bit?: SortOrder
    tinyint?: SortOrder
    smallint?: SortOrder
    int?: SortOrder
    bigint?: SortOrder
    float?: SortOrder
    date?: SortOrder
    time?: SortOrder
    datetime?: SortOrder
    varchar?: SortOrder
    text?: SortOrder
    json?: SortOrder
    blob?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaValueAvgOrderByAggregateInput = {
    type?: SortOrder
    order?: SortOrder
    bit?: SortOrder
    tinyint?: SortOrder
    smallint?: SortOrder
    int?: SortOrder
    bigint?: SortOrder
    float?: SortOrder
  }

  export type MetaValueMaxOrderByAggregateInput = {
    parentId?: SortOrder
    name?: SortOrder
    attributeId?: SortOrder
    type?: SortOrder
    childrenProperty?: SortOrder
    order?: SortOrder
    bit?: SortOrder
    tinyint?: SortOrder
    smallint?: SortOrder
    int?: SortOrder
    bigint?: SortOrder
    float?: SortOrder
    date?: SortOrder
    time?: SortOrder
    datetime?: SortOrder
    varchar?: SortOrder
    text?: SortOrder
    blob?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaValueMinOrderByAggregateInput = {
    parentId?: SortOrder
    name?: SortOrder
    attributeId?: SortOrder
    type?: SortOrder
    childrenProperty?: SortOrder
    order?: SortOrder
    bit?: SortOrder
    tinyint?: SortOrder
    smallint?: SortOrder
    int?: SortOrder
    bigint?: SortOrder
    float?: SortOrder
    date?: SortOrder
    time?: SortOrder
    datetime?: SortOrder
    varchar?: SortOrder
    text?: SortOrder
    blob?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MetaValueSumOrderByAggregateInput = {
    type?: SortOrder
    order?: SortOrder
    bit?: SortOrder
    tinyint?: SortOrder
    smallint?: SortOrder
    int?: SortOrder
    bigint?: SortOrder
    float?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type MetaValueScalarRelationFilter = {
    is?: MetaValueWhereInput
    isNot?: MetaValueWhereInput
  }

  export type MetaRecordRelationValueParentIdValueNameRecordIdCompoundUniqueInput = {
    valueParentId: string
    valueName: string
    recordId: string
  }

  export type MetaRecordRelationCountOrderByAggregateInput = {
    valueParentId?: SortOrder
    valueName?: SortOrder
    recordId?: SortOrder
  }

  export type MetaRecordRelationMaxOrderByAggregateInput = {
    valueParentId?: SortOrder
    valueName?: SortOrder
    recordId?: SortOrder
  }

  export type MetaRecordRelationMinOrderByAggregateInput = {
    valueParentId?: SortOrder
    valueName?: SortOrder
    recordId?: SortOrder
  }

  export type MetaAttributeCreateNestedManyWithoutRelationInput = {
    create?: XOR<MetaAttributeCreateWithoutRelationInput, MetaAttributeUncheckedCreateWithoutRelationInput> | MetaAttributeCreateWithoutRelationInput[] | MetaAttributeUncheckedCreateWithoutRelationInput[]
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutRelationInput | MetaAttributeCreateOrConnectWithoutRelationInput[]
    createMany?: MetaAttributeCreateManyRelationInputEnvelope
    connect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
  }

  export type MetaRecordCreateNestedManyWithoutEntityInput = {
    create?: XOR<MetaRecordCreateWithoutEntityInput, MetaRecordUncheckedCreateWithoutEntityInput> | MetaRecordCreateWithoutEntityInput[] | MetaRecordUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: MetaRecordCreateOrConnectWithoutEntityInput | MetaRecordCreateOrConnectWithoutEntityInput[]
    createMany?: MetaRecordCreateManyEntityInputEnvelope
    connect?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
  }

  export type MetaAttributeCreateNestedManyWithoutEntityInput = {
    create?: XOR<MetaAttributeCreateWithoutEntityInput, MetaAttributeUncheckedCreateWithoutEntityInput> | MetaAttributeCreateWithoutEntityInput[] | MetaAttributeUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutEntityInput | MetaAttributeCreateOrConnectWithoutEntityInput[]
    createMany?: MetaAttributeCreateManyEntityInputEnvelope
    connect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
  }

  export type MetaAttributeUncheckedCreateNestedManyWithoutRelationInput = {
    create?: XOR<MetaAttributeCreateWithoutRelationInput, MetaAttributeUncheckedCreateWithoutRelationInput> | MetaAttributeCreateWithoutRelationInput[] | MetaAttributeUncheckedCreateWithoutRelationInput[]
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutRelationInput | MetaAttributeCreateOrConnectWithoutRelationInput[]
    createMany?: MetaAttributeCreateManyRelationInputEnvelope
    connect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
  }

  export type MetaRecordUncheckedCreateNestedManyWithoutEntityInput = {
    create?: XOR<MetaRecordCreateWithoutEntityInput, MetaRecordUncheckedCreateWithoutEntityInput> | MetaRecordCreateWithoutEntityInput[] | MetaRecordUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: MetaRecordCreateOrConnectWithoutEntityInput | MetaRecordCreateOrConnectWithoutEntityInput[]
    createMany?: MetaRecordCreateManyEntityInputEnvelope
    connect?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
  }

  export type MetaAttributeUncheckedCreateNestedManyWithoutEntityInput = {
    create?: XOR<MetaAttributeCreateWithoutEntityInput, MetaAttributeUncheckedCreateWithoutEntityInput> | MetaAttributeCreateWithoutEntityInput[] | MetaAttributeUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutEntityInput | MetaAttributeCreateOrConnectWithoutEntityInput[]
    createMany?: MetaAttributeCreateManyEntityInputEnvelope
    connect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MetaAttributeUpdateManyWithoutRelationNestedInput = {
    create?: XOR<MetaAttributeCreateWithoutRelationInput, MetaAttributeUncheckedCreateWithoutRelationInput> | MetaAttributeCreateWithoutRelationInput[] | MetaAttributeUncheckedCreateWithoutRelationInput[]
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutRelationInput | MetaAttributeCreateOrConnectWithoutRelationInput[]
    upsert?: MetaAttributeUpsertWithWhereUniqueWithoutRelationInput | MetaAttributeUpsertWithWhereUniqueWithoutRelationInput[]
    createMany?: MetaAttributeCreateManyRelationInputEnvelope
    set?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    disconnect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    delete?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    connect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    update?: MetaAttributeUpdateWithWhereUniqueWithoutRelationInput | MetaAttributeUpdateWithWhereUniqueWithoutRelationInput[]
    updateMany?: MetaAttributeUpdateManyWithWhereWithoutRelationInput | MetaAttributeUpdateManyWithWhereWithoutRelationInput[]
    deleteMany?: MetaAttributeScalarWhereInput | MetaAttributeScalarWhereInput[]
  }

  export type MetaRecordUpdateManyWithoutEntityNestedInput = {
    create?: XOR<MetaRecordCreateWithoutEntityInput, MetaRecordUncheckedCreateWithoutEntityInput> | MetaRecordCreateWithoutEntityInput[] | MetaRecordUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: MetaRecordCreateOrConnectWithoutEntityInput | MetaRecordCreateOrConnectWithoutEntityInput[]
    upsert?: MetaRecordUpsertWithWhereUniqueWithoutEntityInput | MetaRecordUpsertWithWhereUniqueWithoutEntityInput[]
    createMany?: MetaRecordCreateManyEntityInputEnvelope
    set?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
    disconnect?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
    delete?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
    connect?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
    update?: MetaRecordUpdateWithWhereUniqueWithoutEntityInput | MetaRecordUpdateWithWhereUniqueWithoutEntityInput[]
    updateMany?: MetaRecordUpdateManyWithWhereWithoutEntityInput | MetaRecordUpdateManyWithWhereWithoutEntityInput[]
    deleteMany?: MetaRecordScalarWhereInput | MetaRecordScalarWhereInput[]
  }

  export type MetaAttributeUpdateManyWithoutEntityNestedInput = {
    create?: XOR<MetaAttributeCreateWithoutEntityInput, MetaAttributeUncheckedCreateWithoutEntityInput> | MetaAttributeCreateWithoutEntityInput[] | MetaAttributeUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutEntityInput | MetaAttributeCreateOrConnectWithoutEntityInput[]
    upsert?: MetaAttributeUpsertWithWhereUniqueWithoutEntityInput | MetaAttributeUpsertWithWhereUniqueWithoutEntityInput[]
    createMany?: MetaAttributeCreateManyEntityInputEnvelope
    set?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    disconnect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    delete?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    connect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    update?: MetaAttributeUpdateWithWhereUniqueWithoutEntityInput | MetaAttributeUpdateWithWhereUniqueWithoutEntityInput[]
    updateMany?: MetaAttributeUpdateManyWithWhereWithoutEntityInput | MetaAttributeUpdateManyWithWhereWithoutEntityInput[]
    deleteMany?: MetaAttributeScalarWhereInput | MetaAttributeScalarWhereInput[]
  }

  export type MetaAttributeUncheckedUpdateManyWithoutRelationNestedInput = {
    create?: XOR<MetaAttributeCreateWithoutRelationInput, MetaAttributeUncheckedCreateWithoutRelationInput> | MetaAttributeCreateWithoutRelationInput[] | MetaAttributeUncheckedCreateWithoutRelationInput[]
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutRelationInput | MetaAttributeCreateOrConnectWithoutRelationInput[]
    upsert?: MetaAttributeUpsertWithWhereUniqueWithoutRelationInput | MetaAttributeUpsertWithWhereUniqueWithoutRelationInput[]
    createMany?: MetaAttributeCreateManyRelationInputEnvelope
    set?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    disconnect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    delete?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    connect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    update?: MetaAttributeUpdateWithWhereUniqueWithoutRelationInput | MetaAttributeUpdateWithWhereUniqueWithoutRelationInput[]
    updateMany?: MetaAttributeUpdateManyWithWhereWithoutRelationInput | MetaAttributeUpdateManyWithWhereWithoutRelationInput[]
    deleteMany?: MetaAttributeScalarWhereInput | MetaAttributeScalarWhereInput[]
  }

  export type MetaRecordUncheckedUpdateManyWithoutEntityNestedInput = {
    create?: XOR<MetaRecordCreateWithoutEntityInput, MetaRecordUncheckedCreateWithoutEntityInput> | MetaRecordCreateWithoutEntityInput[] | MetaRecordUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: MetaRecordCreateOrConnectWithoutEntityInput | MetaRecordCreateOrConnectWithoutEntityInput[]
    upsert?: MetaRecordUpsertWithWhereUniqueWithoutEntityInput | MetaRecordUpsertWithWhereUniqueWithoutEntityInput[]
    createMany?: MetaRecordCreateManyEntityInputEnvelope
    set?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
    disconnect?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
    delete?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
    connect?: MetaRecordWhereUniqueInput | MetaRecordWhereUniqueInput[]
    update?: MetaRecordUpdateWithWhereUniqueWithoutEntityInput | MetaRecordUpdateWithWhereUniqueWithoutEntityInput[]
    updateMany?: MetaRecordUpdateManyWithWhereWithoutEntityInput | MetaRecordUpdateManyWithWhereWithoutEntityInput[]
    deleteMany?: MetaRecordScalarWhereInput | MetaRecordScalarWhereInput[]
  }

  export type MetaAttributeUncheckedUpdateManyWithoutEntityNestedInput = {
    create?: XOR<MetaAttributeCreateWithoutEntityInput, MetaAttributeUncheckedCreateWithoutEntityInput> | MetaAttributeCreateWithoutEntityInput[] | MetaAttributeUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutEntityInput | MetaAttributeCreateOrConnectWithoutEntityInput[]
    upsert?: MetaAttributeUpsertWithWhereUniqueWithoutEntityInput | MetaAttributeUpsertWithWhereUniqueWithoutEntityInput[]
    createMany?: MetaAttributeCreateManyEntityInputEnvelope
    set?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    disconnect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    delete?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    connect?: MetaAttributeWhereUniqueInput | MetaAttributeWhereUniqueInput[]
    update?: MetaAttributeUpdateWithWhereUniqueWithoutEntityInput | MetaAttributeUpdateWithWhereUniqueWithoutEntityInput[]
    updateMany?: MetaAttributeUpdateManyWithWhereWithoutEntityInput | MetaAttributeUpdateManyWithWhereWithoutEntityInput[]
    deleteMany?: MetaAttributeScalarWhereInput | MetaAttributeScalarWhereInput[]
  }

  export type MetaValueCreateNestedManyWithoutAttributeInput = {
    create?: XOR<MetaValueCreateWithoutAttributeInput, MetaValueUncheckedCreateWithoutAttributeInput> | MetaValueCreateWithoutAttributeInput[] | MetaValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: MetaValueCreateOrConnectWithoutAttributeInput | MetaValueCreateOrConnectWithoutAttributeInput[]
    createMany?: MetaValueCreateManyAttributeInputEnvelope
    connect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
  }

  export type MetaEntityCreateNestedOneWithoutChildrenInput = {
    create?: XOR<MetaEntityCreateWithoutChildrenInput, MetaEntityUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: MetaEntityCreateOrConnectWithoutChildrenInput
    connect?: MetaEntityWhereUniqueInput
  }

  export type MetaEntityCreateNestedOneWithoutRelationsInput = {
    create?: XOR<MetaEntityCreateWithoutRelationsInput, MetaEntityUncheckedCreateWithoutRelationsInput>
    connectOrCreate?: MetaEntityCreateOrConnectWithoutRelationsInput
    connect?: MetaEntityWhereUniqueInput
  }

  export type MetaValueUncheckedCreateNestedManyWithoutAttributeInput = {
    create?: XOR<MetaValueCreateWithoutAttributeInput, MetaValueUncheckedCreateWithoutAttributeInput> | MetaValueCreateWithoutAttributeInput[] | MetaValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: MetaValueCreateOrConnectWithoutAttributeInput | MetaValueCreateOrConnectWithoutAttributeInput[]
    createMany?: MetaValueCreateManyAttributeInputEnvelope
    connect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
  }

  export type MetaValueUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<MetaValueCreateWithoutAttributeInput, MetaValueUncheckedCreateWithoutAttributeInput> | MetaValueCreateWithoutAttributeInput[] | MetaValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: MetaValueCreateOrConnectWithoutAttributeInput | MetaValueCreateOrConnectWithoutAttributeInput[]
    upsert?: MetaValueUpsertWithWhereUniqueWithoutAttributeInput | MetaValueUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: MetaValueCreateManyAttributeInputEnvelope
    set?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    disconnect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    delete?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    connect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    update?: MetaValueUpdateWithWhereUniqueWithoutAttributeInput | MetaValueUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: MetaValueUpdateManyWithWhereWithoutAttributeInput | MetaValueUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: MetaValueScalarWhereInput | MetaValueScalarWhereInput[]
  }

  export type MetaEntityUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<MetaEntityCreateWithoutChildrenInput, MetaEntityUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: MetaEntityCreateOrConnectWithoutChildrenInput
    upsert?: MetaEntityUpsertWithoutChildrenInput
    disconnect?: MetaEntityWhereInput | boolean
    delete?: MetaEntityWhereInput | boolean
    connect?: MetaEntityWhereUniqueInput
    update?: XOR<XOR<MetaEntityUpdateToOneWithWhereWithoutChildrenInput, MetaEntityUpdateWithoutChildrenInput>, MetaEntityUncheckedUpdateWithoutChildrenInput>
  }

  export type MetaEntityUpdateOneWithoutRelationsNestedInput = {
    create?: XOR<MetaEntityCreateWithoutRelationsInput, MetaEntityUncheckedCreateWithoutRelationsInput>
    connectOrCreate?: MetaEntityCreateOrConnectWithoutRelationsInput
    upsert?: MetaEntityUpsertWithoutRelationsInput
    disconnect?: MetaEntityWhereInput | boolean
    delete?: MetaEntityWhereInput | boolean
    connect?: MetaEntityWhereUniqueInput
    update?: XOR<XOR<MetaEntityUpdateToOneWithWhereWithoutRelationsInput, MetaEntityUpdateWithoutRelationsInput>, MetaEntityUncheckedUpdateWithoutRelationsInput>
  }

  export type MetaValueUncheckedUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<MetaValueCreateWithoutAttributeInput, MetaValueUncheckedCreateWithoutAttributeInput> | MetaValueCreateWithoutAttributeInput[] | MetaValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: MetaValueCreateOrConnectWithoutAttributeInput | MetaValueCreateOrConnectWithoutAttributeInput[]
    upsert?: MetaValueUpsertWithWhereUniqueWithoutAttributeInput | MetaValueUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: MetaValueCreateManyAttributeInputEnvelope
    set?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    disconnect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    delete?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    connect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    update?: MetaValueUpdateWithWhereUniqueWithoutAttributeInput | MetaValueUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: MetaValueUpdateManyWithWhereWithoutAttributeInput | MetaValueUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: MetaValueScalarWhereInput | MetaValueScalarWhereInput[]
  }

  export type MetaEntityCreateNestedOneWithoutRecordsInput = {
    create?: XOR<MetaEntityCreateWithoutRecordsInput, MetaEntityUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: MetaEntityCreateOrConnectWithoutRecordsInput
    connect?: MetaEntityWhereUniqueInput
  }

  export type MetaRecordRelationCreateNestedManyWithoutRecordInput = {
    create?: XOR<MetaRecordRelationCreateWithoutRecordInput, MetaRecordRelationUncheckedCreateWithoutRecordInput> | MetaRecordRelationCreateWithoutRecordInput[] | MetaRecordRelationUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: MetaRecordRelationCreateOrConnectWithoutRecordInput | MetaRecordRelationCreateOrConnectWithoutRecordInput[]
    createMany?: MetaRecordRelationCreateManyRecordInputEnvelope
    connect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
  }

  export type MetaValueCreateNestedManyWithoutParentInput = {
    create?: XOR<MetaValueCreateWithoutParentInput, MetaValueUncheckedCreateWithoutParentInput> | MetaValueCreateWithoutParentInput[] | MetaValueUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MetaValueCreateOrConnectWithoutParentInput | MetaValueCreateOrConnectWithoutParentInput[]
    createMany?: MetaValueCreateManyParentInputEnvelope
    connect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
  }

  export type MetaRecordRelationUncheckedCreateNestedManyWithoutRecordInput = {
    create?: XOR<MetaRecordRelationCreateWithoutRecordInput, MetaRecordRelationUncheckedCreateWithoutRecordInput> | MetaRecordRelationCreateWithoutRecordInput[] | MetaRecordRelationUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: MetaRecordRelationCreateOrConnectWithoutRecordInput | MetaRecordRelationCreateOrConnectWithoutRecordInput[]
    createMany?: MetaRecordRelationCreateManyRecordInputEnvelope
    connect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
  }

  export type MetaValueUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<MetaValueCreateWithoutParentInput, MetaValueUncheckedCreateWithoutParentInput> | MetaValueCreateWithoutParentInput[] | MetaValueUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MetaValueCreateOrConnectWithoutParentInput | MetaValueCreateOrConnectWithoutParentInput[]
    createMany?: MetaValueCreateManyParentInputEnvelope
    connect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
  }

  export type MetaEntityUpdateOneWithoutRecordsNestedInput = {
    create?: XOR<MetaEntityCreateWithoutRecordsInput, MetaEntityUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: MetaEntityCreateOrConnectWithoutRecordsInput
    upsert?: MetaEntityUpsertWithoutRecordsInput
    disconnect?: MetaEntityWhereInput | boolean
    delete?: MetaEntityWhereInput | boolean
    connect?: MetaEntityWhereUniqueInput
    update?: XOR<XOR<MetaEntityUpdateToOneWithWhereWithoutRecordsInput, MetaEntityUpdateWithoutRecordsInput>, MetaEntityUncheckedUpdateWithoutRecordsInput>
  }

  export type MetaRecordRelationUpdateManyWithoutRecordNestedInput = {
    create?: XOR<MetaRecordRelationCreateWithoutRecordInput, MetaRecordRelationUncheckedCreateWithoutRecordInput> | MetaRecordRelationCreateWithoutRecordInput[] | MetaRecordRelationUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: MetaRecordRelationCreateOrConnectWithoutRecordInput | MetaRecordRelationCreateOrConnectWithoutRecordInput[]
    upsert?: MetaRecordRelationUpsertWithWhereUniqueWithoutRecordInput | MetaRecordRelationUpsertWithWhereUniqueWithoutRecordInput[]
    createMany?: MetaRecordRelationCreateManyRecordInputEnvelope
    set?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    disconnect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    delete?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    connect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    update?: MetaRecordRelationUpdateWithWhereUniqueWithoutRecordInput | MetaRecordRelationUpdateWithWhereUniqueWithoutRecordInput[]
    updateMany?: MetaRecordRelationUpdateManyWithWhereWithoutRecordInput | MetaRecordRelationUpdateManyWithWhereWithoutRecordInput[]
    deleteMany?: MetaRecordRelationScalarWhereInput | MetaRecordRelationScalarWhereInput[]
  }

  export type MetaValueUpdateManyWithoutParentNestedInput = {
    create?: XOR<MetaValueCreateWithoutParentInput, MetaValueUncheckedCreateWithoutParentInput> | MetaValueCreateWithoutParentInput[] | MetaValueUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MetaValueCreateOrConnectWithoutParentInput | MetaValueCreateOrConnectWithoutParentInput[]
    upsert?: MetaValueUpsertWithWhereUniqueWithoutParentInput | MetaValueUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: MetaValueCreateManyParentInputEnvelope
    set?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    disconnect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    delete?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    connect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    update?: MetaValueUpdateWithWhereUniqueWithoutParentInput | MetaValueUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: MetaValueUpdateManyWithWhereWithoutParentInput | MetaValueUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: MetaValueScalarWhereInput | MetaValueScalarWhereInput[]
  }

  export type MetaRecordRelationUncheckedUpdateManyWithoutRecordNestedInput = {
    create?: XOR<MetaRecordRelationCreateWithoutRecordInput, MetaRecordRelationUncheckedCreateWithoutRecordInput> | MetaRecordRelationCreateWithoutRecordInput[] | MetaRecordRelationUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: MetaRecordRelationCreateOrConnectWithoutRecordInput | MetaRecordRelationCreateOrConnectWithoutRecordInput[]
    upsert?: MetaRecordRelationUpsertWithWhereUniqueWithoutRecordInput | MetaRecordRelationUpsertWithWhereUniqueWithoutRecordInput[]
    createMany?: MetaRecordRelationCreateManyRecordInputEnvelope
    set?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    disconnect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    delete?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    connect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    update?: MetaRecordRelationUpdateWithWhereUniqueWithoutRecordInput | MetaRecordRelationUpdateWithWhereUniqueWithoutRecordInput[]
    updateMany?: MetaRecordRelationUpdateManyWithWhereWithoutRecordInput | MetaRecordRelationUpdateManyWithWhereWithoutRecordInput[]
    deleteMany?: MetaRecordRelationScalarWhereInput | MetaRecordRelationScalarWhereInput[]
  }

  export type MetaValueUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<MetaValueCreateWithoutParentInput, MetaValueUncheckedCreateWithoutParentInput> | MetaValueCreateWithoutParentInput[] | MetaValueUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MetaValueCreateOrConnectWithoutParentInput | MetaValueCreateOrConnectWithoutParentInput[]
    upsert?: MetaValueUpsertWithWhereUniqueWithoutParentInput | MetaValueUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: MetaValueCreateManyParentInputEnvelope
    set?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    disconnect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    delete?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    connect?: MetaValueWhereUniqueInput | MetaValueWhereUniqueInput[]
    update?: MetaValueUpdateWithWhereUniqueWithoutParentInput | MetaValueUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: MetaValueUpdateManyWithWhereWithoutParentInput | MetaValueUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: MetaValueScalarWhereInput | MetaValueScalarWhereInput[]
  }

  export type MetaRecordCreateNestedOneWithoutValueInput = {
    create?: XOR<MetaRecordCreateWithoutValueInput, MetaRecordUncheckedCreateWithoutValueInput>
    connectOrCreate?: MetaRecordCreateOrConnectWithoutValueInput
    connect?: MetaRecordWhereUniqueInput
  }

  export type MetaAttributeCreateNestedOneWithoutValuesInput = {
    create?: XOR<MetaAttributeCreateWithoutValuesInput, MetaAttributeUncheckedCreateWithoutValuesInput>
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutValuesInput
    connect?: MetaAttributeWhereUniqueInput
  }

  export type MetaRecordRelationCreateNestedManyWithoutValueInput = {
    create?: XOR<MetaRecordRelationCreateWithoutValueInput, MetaRecordRelationUncheckedCreateWithoutValueInput> | MetaRecordRelationCreateWithoutValueInput[] | MetaRecordRelationUncheckedCreateWithoutValueInput[]
    connectOrCreate?: MetaRecordRelationCreateOrConnectWithoutValueInput | MetaRecordRelationCreateOrConnectWithoutValueInput[]
    createMany?: MetaRecordRelationCreateManyValueInputEnvelope
    connect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
  }

  export type MetaRecordRelationUncheckedCreateNestedManyWithoutValueInput = {
    create?: XOR<MetaRecordRelationCreateWithoutValueInput, MetaRecordRelationUncheckedCreateWithoutValueInput> | MetaRecordRelationCreateWithoutValueInput[] | MetaRecordRelationUncheckedCreateWithoutValueInput[]
    connectOrCreate?: MetaRecordRelationCreateOrConnectWithoutValueInput | MetaRecordRelationCreateOrConnectWithoutValueInput[]
    createMany?: MetaRecordRelationCreateManyValueInputEnvelope
    connect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBytesFieldUpdateOperationsInput = {
    set?: Bytes | null
  }

  export type MetaRecordUpdateOneRequiredWithoutValueNestedInput = {
    create?: XOR<MetaRecordCreateWithoutValueInput, MetaRecordUncheckedCreateWithoutValueInput>
    connectOrCreate?: MetaRecordCreateOrConnectWithoutValueInput
    upsert?: MetaRecordUpsertWithoutValueInput
    connect?: MetaRecordWhereUniqueInput
    update?: XOR<XOR<MetaRecordUpdateToOneWithWhereWithoutValueInput, MetaRecordUpdateWithoutValueInput>, MetaRecordUncheckedUpdateWithoutValueInput>
  }

  export type MetaAttributeUpdateOneWithoutValuesNestedInput = {
    create?: XOR<MetaAttributeCreateWithoutValuesInput, MetaAttributeUncheckedCreateWithoutValuesInput>
    connectOrCreate?: MetaAttributeCreateOrConnectWithoutValuesInput
    upsert?: MetaAttributeUpsertWithoutValuesInput
    disconnect?: MetaAttributeWhereInput | boolean
    delete?: MetaAttributeWhereInput | boolean
    connect?: MetaAttributeWhereUniqueInput
    update?: XOR<XOR<MetaAttributeUpdateToOneWithWhereWithoutValuesInput, MetaAttributeUpdateWithoutValuesInput>, MetaAttributeUncheckedUpdateWithoutValuesInput>
  }

  export type MetaRecordRelationUpdateManyWithoutValueNestedInput = {
    create?: XOR<MetaRecordRelationCreateWithoutValueInput, MetaRecordRelationUncheckedCreateWithoutValueInput> | MetaRecordRelationCreateWithoutValueInput[] | MetaRecordRelationUncheckedCreateWithoutValueInput[]
    connectOrCreate?: MetaRecordRelationCreateOrConnectWithoutValueInput | MetaRecordRelationCreateOrConnectWithoutValueInput[]
    upsert?: MetaRecordRelationUpsertWithWhereUniqueWithoutValueInput | MetaRecordRelationUpsertWithWhereUniqueWithoutValueInput[]
    createMany?: MetaRecordRelationCreateManyValueInputEnvelope
    set?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    disconnect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    delete?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    connect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    update?: MetaRecordRelationUpdateWithWhereUniqueWithoutValueInput | MetaRecordRelationUpdateWithWhereUniqueWithoutValueInput[]
    updateMany?: MetaRecordRelationUpdateManyWithWhereWithoutValueInput | MetaRecordRelationUpdateManyWithWhereWithoutValueInput[]
    deleteMany?: MetaRecordRelationScalarWhereInput | MetaRecordRelationScalarWhereInput[]
  }

  export type MetaRecordRelationUncheckedUpdateManyWithoutValueNestedInput = {
    create?: XOR<MetaRecordRelationCreateWithoutValueInput, MetaRecordRelationUncheckedCreateWithoutValueInput> | MetaRecordRelationCreateWithoutValueInput[] | MetaRecordRelationUncheckedCreateWithoutValueInput[]
    connectOrCreate?: MetaRecordRelationCreateOrConnectWithoutValueInput | MetaRecordRelationCreateOrConnectWithoutValueInput[]
    upsert?: MetaRecordRelationUpsertWithWhereUniqueWithoutValueInput | MetaRecordRelationUpsertWithWhereUniqueWithoutValueInput[]
    createMany?: MetaRecordRelationCreateManyValueInputEnvelope
    set?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    disconnect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    delete?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    connect?: MetaRecordRelationWhereUniqueInput | MetaRecordRelationWhereUniqueInput[]
    update?: MetaRecordRelationUpdateWithWhereUniqueWithoutValueInput | MetaRecordRelationUpdateWithWhereUniqueWithoutValueInput[]
    updateMany?: MetaRecordRelationUpdateManyWithWhereWithoutValueInput | MetaRecordRelationUpdateManyWithWhereWithoutValueInput[]
    deleteMany?: MetaRecordRelationScalarWhereInput | MetaRecordRelationScalarWhereInput[]
  }

  export type MetaValueCreateNestedOneWithoutChildrenInput = {
    create?: XOR<MetaValueCreateWithoutChildrenInput, MetaValueUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: MetaValueCreateOrConnectWithoutChildrenInput
    connect?: MetaValueWhereUniqueInput
  }

  export type MetaRecordCreateNestedOneWithoutParentInput = {
    create?: XOR<MetaRecordCreateWithoutParentInput, MetaRecordUncheckedCreateWithoutParentInput>
    connectOrCreate?: MetaRecordCreateOrConnectWithoutParentInput
    connect?: MetaRecordWhereUniqueInput
  }

  export type MetaValueUpdateOneRequiredWithoutChildrenNestedInput = {
    create?: XOR<MetaValueCreateWithoutChildrenInput, MetaValueUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: MetaValueCreateOrConnectWithoutChildrenInput
    upsert?: MetaValueUpsertWithoutChildrenInput
    connect?: MetaValueWhereUniqueInput
    update?: XOR<XOR<MetaValueUpdateToOneWithWhereWithoutChildrenInput, MetaValueUpdateWithoutChildrenInput>, MetaValueUncheckedUpdateWithoutChildrenInput>
  }

  export type MetaRecordUpdateOneRequiredWithoutParentNestedInput = {
    create?: XOR<MetaRecordCreateWithoutParentInput, MetaRecordUncheckedCreateWithoutParentInput>
    connectOrCreate?: MetaRecordCreateOrConnectWithoutParentInput
    upsert?: MetaRecordUpsertWithoutParentInput
    connect?: MetaRecordWhereUniqueInput
    update?: XOR<XOR<MetaRecordUpdateToOneWithWhereWithoutParentInput, MetaRecordUpdateWithoutParentInput>, MetaRecordUncheckedUpdateWithoutParentInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type MetaAttributeCreateWithoutRelationInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    values?: MetaValueCreateNestedManyWithoutAttributeInput
    entity?: MetaEntityCreateNestedOneWithoutChildrenInput
  }

  export type MetaAttributeUncheckedCreateWithoutRelationInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    entityId?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    values?: MetaValueUncheckedCreateNestedManyWithoutAttributeInput
  }

  export type MetaAttributeCreateOrConnectWithoutRelationInput = {
    where: MetaAttributeWhereUniqueInput
    create: XOR<MetaAttributeCreateWithoutRelationInput, MetaAttributeUncheckedCreateWithoutRelationInput>
  }

  export type MetaAttributeCreateManyRelationInputEnvelope = {
    data: MetaAttributeCreateManyRelationInput | MetaAttributeCreateManyRelationInput[]
    skipDuplicates?: boolean
  }

  export type MetaRecordCreateWithoutEntityInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: MetaRecordRelationCreateNestedManyWithoutRecordInput
    value?: MetaValueCreateNestedManyWithoutParentInput
  }

  export type MetaRecordUncheckedCreateWithoutEntityInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: MetaRecordRelationUncheckedCreateNestedManyWithoutRecordInput
    value?: MetaValueUncheckedCreateNestedManyWithoutParentInput
  }

  export type MetaRecordCreateOrConnectWithoutEntityInput = {
    where: MetaRecordWhereUniqueInput
    create: XOR<MetaRecordCreateWithoutEntityInput, MetaRecordUncheckedCreateWithoutEntityInput>
  }

  export type MetaRecordCreateManyEntityInputEnvelope = {
    data: MetaRecordCreateManyEntityInput | MetaRecordCreateManyEntityInput[]
    skipDuplicates?: boolean
  }

  export type MetaAttributeCreateWithoutEntityInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    values?: MetaValueCreateNestedManyWithoutAttributeInput
    relation?: MetaEntityCreateNestedOneWithoutRelationsInput
  }

  export type MetaAttributeUncheckedCreateWithoutEntityInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    relationId?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    values?: MetaValueUncheckedCreateNestedManyWithoutAttributeInput
  }

  export type MetaAttributeCreateOrConnectWithoutEntityInput = {
    where: MetaAttributeWhereUniqueInput
    create: XOR<MetaAttributeCreateWithoutEntityInput, MetaAttributeUncheckedCreateWithoutEntityInput>
  }

  export type MetaAttributeCreateManyEntityInputEnvelope = {
    data: MetaAttributeCreateManyEntityInput | MetaAttributeCreateManyEntityInput[]
    skipDuplicates?: boolean
  }

  export type MetaAttributeUpsertWithWhereUniqueWithoutRelationInput = {
    where: MetaAttributeWhereUniqueInput
    update: XOR<MetaAttributeUpdateWithoutRelationInput, MetaAttributeUncheckedUpdateWithoutRelationInput>
    create: XOR<MetaAttributeCreateWithoutRelationInput, MetaAttributeUncheckedCreateWithoutRelationInput>
  }

  export type MetaAttributeUpdateWithWhereUniqueWithoutRelationInput = {
    where: MetaAttributeWhereUniqueInput
    data: XOR<MetaAttributeUpdateWithoutRelationInput, MetaAttributeUncheckedUpdateWithoutRelationInput>
  }

  export type MetaAttributeUpdateManyWithWhereWithoutRelationInput = {
    where: MetaAttributeScalarWhereInput
    data: XOR<MetaAttributeUpdateManyMutationInput, MetaAttributeUncheckedUpdateManyWithoutRelationInput>
  }

  export type MetaAttributeScalarWhereInput = {
    AND?: MetaAttributeScalarWhereInput | MetaAttributeScalarWhereInput[]
    OR?: MetaAttributeScalarWhereInput[]
    NOT?: MetaAttributeScalarWhereInput | MetaAttributeScalarWhereInput[]
    id?: StringFilter<"MetaAttribute"> | string
    title?: StringNullableFilter<"MetaAttribute"> | string | null
    name?: StringFilter<"MetaAttribute"> | string
    description?: StringNullableFilter<"MetaAttribute"> | string | null
    multiple?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    type?: StringNullableFilter<"MetaAttribute"> | string | null
    required?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    readonly?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    order?: IntNullableFilter<"MetaAttribute"> | number | null
    disable?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    hash?: StringNullableFilter<"MetaAttribute"> | string | null
    default?: StringNullableFilter<"MetaAttribute"> | string | null
    role?: IntNullableFilter<"MetaAttribute"> | number | null
    security?: BoolNullableFilter<"MetaAttribute"> | boolean | null
    field?: StringNullableFilter<"MetaAttribute"> | string | null
    entityId?: StringNullableFilter<"MetaAttribute"> | string | null
    relationId?: StringNullableFilter<"MetaAttribute"> | string | null
    relationName?: StringNullableFilter<"MetaAttribute"> | string | null
    createdAt?: DateTimeFilter<"MetaAttribute"> | Date | string
    updatedAt?: DateTimeFilter<"MetaAttribute"> | Date | string
  }

  export type MetaRecordUpsertWithWhereUniqueWithoutEntityInput = {
    where: MetaRecordWhereUniqueInput
    update: XOR<MetaRecordUpdateWithoutEntityInput, MetaRecordUncheckedUpdateWithoutEntityInput>
    create: XOR<MetaRecordCreateWithoutEntityInput, MetaRecordUncheckedCreateWithoutEntityInput>
  }

  export type MetaRecordUpdateWithWhereUniqueWithoutEntityInput = {
    where: MetaRecordWhereUniqueInput
    data: XOR<MetaRecordUpdateWithoutEntityInput, MetaRecordUncheckedUpdateWithoutEntityInput>
  }

  export type MetaRecordUpdateManyWithWhereWithoutEntityInput = {
    where: MetaRecordScalarWhereInput
    data: XOR<MetaRecordUpdateManyMutationInput, MetaRecordUncheckedUpdateManyWithoutEntityInput>
  }

  export type MetaRecordScalarWhereInput = {
    AND?: MetaRecordScalarWhereInput | MetaRecordScalarWhereInput[]
    OR?: MetaRecordScalarWhereInput[]
    NOT?: MetaRecordScalarWhereInput | MetaRecordScalarWhereInput[]
    id?: StringFilter<"MetaRecord"> | string
    entityId?: StringNullableFilter<"MetaRecord"> | string | null
    createdAt?: DateTimeFilter<"MetaRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MetaRecord"> | Date | string
  }

  export type MetaAttributeUpsertWithWhereUniqueWithoutEntityInput = {
    where: MetaAttributeWhereUniqueInput
    update: XOR<MetaAttributeUpdateWithoutEntityInput, MetaAttributeUncheckedUpdateWithoutEntityInput>
    create: XOR<MetaAttributeCreateWithoutEntityInput, MetaAttributeUncheckedCreateWithoutEntityInput>
  }

  export type MetaAttributeUpdateWithWhereUniqueWithoutEntityInput = {
    where: MetaAttributeWhereUniqueInput
    data: XOR<MetaAttributeUpdateWithoutEntityInput, MetaAttributeUncheckedUpdateWithoutEntityInput>
  }

  export type MetaAttributeUpdateManyWithWhereWithoutEntityInput = {
    where: MetaAttributeScalarWhereInput
    data: XOR<MetaAttributeUpdateManyMutationInput, MetaAttributeUncheckedUpdateManyWithoutEntityInput>
  }

  export type MetaValueCreateWithoutAttributeInput = {
    name: string
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: MetaRecordCreateNestedOneWithoutValueInput
    children?: MetaRecordRelationCreateNestedManyWithoutValueInput
  }

  export type MetaValueUncheckedCreateWithoutAttributeInput = {
    parentId: string
    name: string
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: MetaRecordRelationUncheckedCreateNestedManyWithoutValueInput
  }

  export type MetaValueCreateOrConnectWithoutAttributeInput = {
    where: MetaValueWhereUniqueInput
    create: XOR<MetaValueCreateWithoutAttributeInput, MetaValueUncheckedCreateWithoutAttributeInput>
  }

  export type MetaValueCreateManyAttributeInputEnvelope = {
    data: MetaValueCreateManyAttributeInput | MetaValueCreateManyAttributeInput[]
    skipDuplicates?: boolean
  }

  export type MetaEntityCreateWithoutChildrenInput = {
    id?: string
    name?: string | null
    title?: string | null
    description?: string | null
    readonly?: boolean | null
    type?: string | null
    hidden?: boolean | null
    order?: number | null
    roleable?: boolean | null
    disable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    relations?: MetaAttributeCreateNestedManyWithoutRelationInput
    records?: MetaRecordCreateNestedManyWithoutEntityInput
  }

  export type MetaEntityUncheckedCreateWithoutChildrenInput = {
    id?: string
    name?: string | null
    title?: string | null
    description?: string | null
    readonly?: boolean | null
    type?: string | null
    hidden?: boolean | null
    order?: number | null
    roleable?: boolean | null
    disable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    relations?: MetaAttributeUncheckedCreateNestedManyWithoutRelationInput
    records?: MetaRecordUncheckedCreateNestedManyWithoutEntityInput
  }

  export type MetaEntityCreateOrConnectWithoutChildrenInput = {
    where: MetaEntityWhereUniqueInput
    create: XOR<MetaEntityCreateWithoutChildrenInput, MetaEntityUncheckedCreateWithoutChildrenInput>
  }

  export type MetaEntityCreateWithoutRelationsInput = {
    id?: string
    name?: string | null
    title?: string | null
    description?: string | null
    readonly?: boolean | null
    type?: string | null
    hidden?: boolean | null
    order?: number | null
    roleable?: boolean | null
    disable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: MetaRecordCreateNestedManyWithoutEntityInput
    children?: MetaAttributeCreateNestedManyWithoutEntityInput
  }

  export type MetaEntityUncheckedCreateWithoutRelationsInput = {
    id?: string
    name?: string | null
    title?: string | null
    description?: string | null
    readonly?: boolean | null
    type?: string | null
    hidden?: boolean | null
    order?: number | null
    roleable?: boolean | null
    disable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: MetaRecordUncheckedCreateNestedManyWithoutEntityInput
    children?: MetaAttributeUncheckedCreateNestedManyWithoutEntityInput
  }

  export type MetaEntityCreateOrConnectWithoutRelationsInput = {
    where: MetaEntityWhereUniqueInput
    create: XOR<MetaEntityCreateWithoutRelationsInput, MetaEntityUncheckedCreateWithoutRelationsInput>
  }

  export type MetaValueUpsertWithWhereUniqueWithoutAttributeInput = {
    where: MetaValueWhereUniqueInput
    update: XOR<MetaValueUpdateWithoutAttributeInput, MetaValueUncheckedUpdateWithoutAttributeInput>
    create: XOR<MetaValueCreateWithoutAttributeInput, MetaValueUncheckedCreateWithoutAttributeInput>
  }

  export type MetaValueUpdateWithWhereUniqueWithoutAttributeInput = {
    where: MetaValueWhereUniqueInput
    data: XOR<MetaValueUpdateWithoutAttributeInput, MetaValueUncheckedUpdateWithoutAttributeInput>
  }

  export type MetaValueUpdateManyWithWhereWithoutAttributeInput = {
    where: MetaValueScalarWhereInput
    data: XOR<MetaValueUpdateManyMutationInput, MetaValueUncheckedUpdateManyWithoutAttributeInput>
  }

  export type MetaValueScalarWhereInput = {
    AND?: MetaValueScalarWhereInput | MetaValueScalarWhereInput[]
    OR?: MetaValueScalarWhereInput[]
    NOT?: MetaValueScalarWhereInput | MetaValueScalarWhereInput[]
    parentId?: StringFilter<"MetaValue"> | string
    name?: StringFilter<"MetaValue"> | string
    attributeId?: StringNullableFilter<"MetaValue"> | string | null
    type?: IntFilter<"MetaValue"> | number
    childrenProperty?: StringNullableFilter<"MetaValue"> | string | null
    order?: IntNullableFilter<"MetaValue"> | number | null
    bit?: IntNullableFilter<"MetaValue"> | number | null
    tinyint?: IntNullableFilter<"MetaValue"> | number | null
    smallint?: IntNullableFilter<"MetaValue"> | number | null
    int?: IntNullableFilter<"MetaValue"> | number | null
    bigint?: BigIntNullableFilter<"MetaValue"> | bigint | number | null
    float?: FloatNullableFilter<"MetaValue"> | number | null
    date?: DateTimeNullableFilter<"MetaValue"> | Date | string | null
    time?: DateTimeNullableFilter<"MetaValue"> | Date | string | null
    datetime?: DateTimeNullableFilter<"MetaValue"> | Date | string | null
    varchar?: StringNullableFilter<"MetaValue"> | string | null
    text?: StringNullableFilter<"MetaValue"> | string | null
    json?: JsonNullableFilter<"MetaValue">
    blob?: BytesNullableFilter<"MetaValue"> | Bytes | null
    createdAt?: DateTimeFilter<"MetaValue"> | Date | string
    updatedAt?: DateTimeFilter<"MetaValue"> | Date | string
  }

  export type MetaEntityUpsertWithoutChildrenInput = {
    update: XOR<MetaEntityUpdateWithoutChildrenInput, MetaEntityUncheckedUpdateWithoutChildrenInput>
    create: XOR<MetaEntityCreateWithoutChildrenInput, MetaEntityUncheckedCreateWithoutChildrenInput>
    where?: MetaEntityWhereInput
  }

  export type MetaEntityUpdateToOneWithWhereWithoutChildrenInput = {
    where?: MetaEntityWhereInput
    data: XOR<MetaEntityUpdateWithoutChildrenInput, MetaEntityUncheckedUpdateWithoutChildrenInput>
  }

  export type MetaEntityUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relations?: MetaAttributeUpdateManyWithoutRelationNestedInput
    records?: MetaRecordUpdateManyWithoutEntityNestedInput
  }

  export type MetaEntityUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relations?: MetaAttributeUncheckedUpdateManyWithoutRelationNestedInput
    records?: MetaRecordUncheckedUpdateManyWithoutEntityNestedInput
  }

  export type MetaEntityUpsertWithoutRelationsInput = {
    update: XOR<MetaEntityUpdateWithoutRelationsInput, MetaEntityUncheckedUpdateWithoutRelationsInput>
    create: XOR<MetaEntityCreateWithoutRelationsInput, MetaEntityUncheckedCreateWithoutRelationsInput>
    where?: MetaEntityWhereInput
  }

  export type MetaEntityUpdateToOneWithWhereWithoutRelationsInput = {
    where?: MetaEntityWhereInput
    data: XOR<MetaEntityUpdateWithoutRelationsInput, MetaEntityUncheckedUpdateWithoutRelationsInput>
  }

  export type MetaEntityUpdateWithoutRelationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: MetaRecordUpdateManyWithoutEntityNestedInput
    children?: MetaAttributeUpdateManyWithoutEntityNestedInput
  }

  export type MetaEntityUncheckedUpdateWithoutRelationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: MetaRecordUncheckedUpdateManyWithoutEntityNestedInput
    children?: MetaAttributeUncheckedUpdateManyWithoutEntityNestedInput
  }

  export type MetaEntityCreateWithoutRecordsInput = {
    id?: string
    name?: string | null
    title?: string | null
    description?: string | null
    readonly?: boolean | null
    type?: string | null
    hidden?: boolean | null
    order?: number | null
    roleable?: boolean | null
    disable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    relations?: MetaAttributeCreateNestedManyWithoutRelationInput
    children?: MetaAttributeCreateNestedManyWithoutEntityInput
  }

  export type MetaEntityUncheckedCreateWithoutRecordsInput = {
    id?: string
    name?: string | null
    title?: string | null
    description?: string | null
    readonly?: boolean | null
    type?: string | null
    hidden?: boolean | null
    order?: number | null
    roleable?: boolean | null
    disable?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    relations?: MetaAttributeUncheckedCreateNestedManyWithoutRelationInput
    children?: MetaAttributeUncheckedCreateNestedManyWithoutEntityInput
  }

  export type MetaEntityCreateOrConnectWithoutRecordsInput = {
    where: MetaEntityWhereUniqueInput
    create: XOR<MetaEntityCreateWithoutRecordsInput, MetaEntityUncheckedCreateWithoutRecordsInput>
  }

  export type MetaRecordRelationCreateWithoutRecordInput = {
    value: MetaValueCreateNestedOneWithoutChildrenInput
  }

  export type MetaRecordRelationUncheckedCreateWithoutRecordInput = {
    valueParentId: string
    valueName: string
  }

  export type MetaRecordRelationCreateOrConnectWithoutRecordInput = {
    where: MetaRecordRelationWhereUniqueInput
    create: XOR<MetaRecordRelationCreateWithoutRecordInput, MetaRecordRelationUncheckedCreateWithoutRecordInput>
  }

  export type MetaRecordRelationCreateManyRecordInputEnvelope = {
    data: MetaRecordRelationCreateManyRecordInput | MetaRecordRelationCreateManyRecordInput[]
    skipDuplicates?: boolean
  }

  export type MetaValueCreateWithoutParentInput = {
    name: string
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attribute?: MetaAttributeCreateNestedOneWithoutValuesInput
    children?: MetaRecordRelationCreateNestedManyWithoutValueInput
  }

  export type MetaValueUncheckedCreateWithoutParentInput = {
    name: string
    attributeId?: string | null
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: MetaRecordRelationUncheckedCreateNestedManyWithoutValueInput
  }

  export type MetaValueCreateOrConnectWithoutParentInput = {
    where: MetaValueWhereUniqueInput
    create: XOR<MetaValueCreateWithoutParentInput, MetaValueUncheckedCreateWithoutParentInput>
  }

  export type MetaValueCreateManyParentInputEnvelope = {
    data: MetaValueCreateManyParentInput | MetaValueCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type MetaEntityUpsertWithoutRecordsInput = {
    update: XOR<MetaEntityUpdateWithoutRecordsInput, MetaEntityUncheckedUpdateWithoutRecordsInput>
    create: XOR<MetaEntityCreateWithoutRecordsInput, MetaEntityUncheckedCreateWithoutRecordsInput>
    where?: MetaEntityWhereInput
  }

  export type MetaEntityUpdateToOneWithWhereWithoutRecordsInput = {
    where?: MetaEntityWhereInput
    data: XOR<MetaEntityUpdateWithoutRecordsInput, MetaEntityUncheckedUpdateWithoutRecordsInput>
  }

  export type MetaEntityUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relations?: MetaAttributeUpdateManyWithoutRelationNestedInput
    children?: MetaAttributeUpdateManyWithoutEntityNestedInput
  }

  export type MetaEntityUncheckedUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    roleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relations?: MetaAttributeUncheckedUpdateManyWithoutRelationNestedInput
    children?: MetaAttributeUncheckedUpdateManyWithoutEntityNestedInput
  }

  export type MetaRecordRelationUpsertWithWhereUniqueWithoutRecordInput = {
    where: MetaRecordRelationWhereUniqueInput
    update: XOR<MetaRecordRelationUpdateWithoutRecordInput, MetaRecordRelationUncheckedUpdateWithoutRecordInput>
    create: XOR<MetaRecordRelationCreateWithoutRecordInput, MetaRecordRelationUncheckedCreateWithoutRecordInput>
  }

  export type MetaRecordRelationUpdateWithWhereUniqueWithoutRecordInput = {
    where: MetaRecordRelationWhereUniqueInput
    data: XOR<MetaRecordRelationUpdateWithoutRecordInput, MetaRecordRelationUncheckedUpdateWithoutRecordInput>
  }

  export type MetaRecordRelationUpdateManyWithWhereWithoutRecordInput = {
    where: MetaRecordRelationScalarWhereInput
    data: XOR<MetaRecordRelationUpdateManyMutationInput, MetaRecordRelationUncheckedUpdateManyWithoutRecordInput>
  }

  export type MetaRecordRelationScalarWhereInput = {
    AND?: MetaRecordRelationScalarWhereInput | MetaRecordRelationScalarWhereInput[]
    OR?: MetaRecordRelationScalarWhereInput[]
    NOT?: MetaRecordRelationScalarWhereInput | MetaRecordRelationScalarWhereInput[]
    valueParentId?: StringFilter<"MetaRecordRelation"> | string
    valueName?: StringFilter<"MetaRecordRelation"> | string
    recordId?: StringFilter<"MetaRecordRelation"> | string
  }

  export type MetaValueUpsertWithWhereUniqueWithoutParentInput = {
    where: MetaValueWhereUniqueInput
    update: XOR<MetaValueUpdateWithoutParentInput, MetaValueUncheckedUpdateWithoutParentInput>
    create: XOR<MetaValueCreateWithoutParentInput, MetaValueUncheckedCreateWithoutParentInput>
  }

  export type MetaValueUpdateWithWhereUniqueWithoutParentInput = {
    where: MetaValueWhereUniqueInput
    data: XOR<MetaValueUpdateWithoutParentInput, MetaValueUncheckedUpdateWithoutParentInput>
  }

  export type MetaValueUpdateManyWithWhereWithoutParentInput = {
    where: MetaValueScalarWhereInput
    data: XOR<MetaValueUpdateManyMutationInput, MetaValueUncheckedUpdateManyWithoutParentInput>
  }

  export type MetaRecordCreateWithoutValueInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entity?: MetaEntityCreateNestedOneWithoutRecordsInput
    parent?: MetaRecordRelationCreateNestedManyWithoutRecordInput
  }

  export type MetaRecordUncheckedCreateWithoutValueInput = {
    id?: string
    entityId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: MetaRecordRelationUncheckedCreateNestedManyWithoutRecordInput
  }

  export type MetaRecordCreateOrConnectWithoutValueInput = {
    where: MetaRecordWhereUniqueInput
    create: XOR<MetaRecordCreateWithoutValueInput, MetaRecordUncheckedCreateWithoutValueInput>
  }

  export type MetaAttributeCreateWithoutValuesInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    entity?: MetaEntityCreateNestedOneWithoutChildrenInput
    relation?: MetaEntityCreateNestedOneWithoutRelationsInput
  }

  export type MetaAttributeUncheckedCreateWithoutValuesInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    entityId?: string | null
    relationId?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaAttributeCreateOrConnectWithoutValuesInput = {
    where: MetaAttributeWhereUniqueInput
    create: XOR<MetaAttributeCreateWithoutValuesInput, MetaAttributeUncheckedCreateWithoutValuesInput>
  }

  export type MetaRecordRelationCreateWithoutValueInput = {
    record: MetaRecordCreateNestedOneWithoutParentInput
  }

  export type MetaRecordRelationUncheckedCreateWithoutValueInput = {
    recordId: string
  }

  export type MetaRecordRelationCreateOrConnectWithoutValueInput = {
    where: MetaRecordRelationWhereUniqueInput
    create: XOR<MetaRecordRelationCreateWithoutValueInput, MetaRecordRelationUncheckedCreateWithoutValueInput>
  }

  export type MetaRecordRelationCreateManyValueInputEnvelope = {
    data: MetaRecordRelationCreateManyValueInput | MetaRecordRelationCreateManyValueInput[]
    skipDuplicates?: boolean
  }

  export type MetaRecordUpsertWithoutValueInput = {
    update: XOR<MetaRecordUpdateWithoutValueInput, MetaRecordUncheckedUpdateWithoutValueInput>
    create: XOR<MetaRecordCreateWithoutValueInput, MetaRecordUncheckedCreateWithoutValueInput>
    where?: MetaRecordWhereInput
  }

  export type MetaRecordUpdateToOneWithWhereWithoutValueInput = {
    where?: MetaRecordWhereInput
    data: XOR<MetaRecordUpdateWithoutValueInput, MetaRecordUncheckedUpdateWithoutValueInput>
  }

  export type MetaRecordUpdateWithoutValueInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entity?: MetaEntityUpdateOneWithoutRecordsNestedInput
    parent?: MetaRecordRelationUpdateManyWithoutRecordNestedInput
  }

  export type MetaRecordUncheckedUpdateWithoutValueInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: MetaRecordRelationUncheckedUpdateManyWithoutRecordNestedInput
  }

  export type MetaAttributeUpsertWithoutValuesInput = {
    update: XOR<MetaAttributeUpdateWithoutValuesInput, MetaAttributeUncheckedUpdateWithoutValuesInput>
    create: XOR<MetaAttributeCreateWithoutValuesInput, MetaAttributeUncheckedCreateWithoutValuesInput>
    where?: MetaAttributeWhereInput
  }

  export type MetaAttributeUpdateToOneWithWhereWithoutValuesInput = {
    where?: MetaAttributeWhereInput
    data: XOR<MetaAttributeUpdateWithoutValuesInput, MetaAttributeUncheckedUpdateWithoutValuesInput>
  }

  export type MetaAttributeUpdateWithoutValuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entity?: MetaEntityUpdateOneWithoutChildrenNestedInput
    relation?: MetaEntityUpdateOneWithoutRelationsNestedInput
  }

  export type MetaAttributeUncheckedUpdateWithoutValuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    relationId?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaRecordRelationUpsertWithWhereUniqueWithoutValueInput = {
    where: MetaRecordRelationWhereUniqueInput
    update: XOR<MetaRecordRelationUpdateWithoutValueInput, MetaRecordRelationUncheckedUpdateWithoutValueInput>
    create: XOR<MetaRecordRelationCreateWithoutValueInput, MetaRecordRelationUncheckedCreateWithoutValueInput>
  }

  export type MetaRecordRelationUpdateWithWhereUniqueWithoutValueInput = {
    where: MetaRecordRelationWhereUniqueInput
    data: XOR<MetaRecordRelationUpdateWithoutValueInput, MetaRecordRelationUncheckedUpdateWithoutValueInput>
  }

  export type MetaRecordRelationUpdateManyWithWhereWithoutValueInput = {
    where: MetaRecordRelationScalarWhereInput
    data: XOR<MetaRecordRelationUpdateManyMutationInput, MetaRecordRelationUncheckedUpdateManyWithoutValueInput>
  }

  export type MetaValueCreateWithoutChildrenInput = {
    name: string
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: MetaRecordCreateNestedOneWithoutValueInput
    attribute?: MetaAttributeCreateNestedOneWithoutValuesInput
  }

  export type MetaValueUncheckedCreateWithoutChildrenInput = {
    parentId: string
    name: string
    attributeId?: string | null
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaValueCreateOrConnectWithoutChildrenInput = {
    where: MetaValueWhereUniqueInput
    create: XOR<MetaValueCreateWithoutChildrenInput, MetaValueUncheckedCreateWithoutChildrenInput>
  }

  export type MetaRecordCreateWithoutParentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entity?: MetaEntityCreateNestedOneWithoutRecordsInput
    value?: MetaValueCreateNestedManyWithoutParentInput
  }

  export type MetaRecordUncheckedCreateWithoutParentInput = {
    id?: string
    entityId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    value?: MetaValueUncheckedCreateNestedManyWithoutParentInput
  }

  export type MetaRecordCreateOrConnectWithoutParentInput = {
    where: MetaRecordWhereUniqueInput
    create: XOR<MetaRecordCreateWithoutParentInput, MetaRecordUncheckedCreateWithoutParentInput>
  }

  export type MetaValueUpsertWithoutChildrenInput = {
    update: XOR<MetaValueUpdateWithoutChildrenInput, MetaValueUncheckedUpdateWithoutChildrenInput>
    create: XOR<MetaValueCreateWithoutChildrenInput, MetaValueUncheckedCreateWithoutChildrenInput>
    where?: MetaValueWhereInput
  }

  export type MetaValueUpdateToOneWithWhereWithoutChildrenInput = {
    where?: MetaValueWhereInput
    data: XOR<MetaValueUpdateWithoutChildrenInput, MetaValueUncheckedUpdateWithoutChildrenInput>
  }

  export type MetaValueUpdateWithoutChildrenInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: MetaRecordUpdateOneRequiredWithoutValueNestedInput
    attribute?: MetaAttributeUpdateOneWithoutValuesNestedInput
  }

  export type MetaValueUncheckedUpdateWithoutChildrenInput = {
    parentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    attributeId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaRecordUpsertWithoutParentInput = {
    update: XOR<MetaRecordUpdateWithoutParentInput, MetaRecordUncheckedUpdateWithoutParentInput>
    create: XOR<MetaRecordCreateWithoutParentInput, MetaRecordUncheckedCreateWithoutParentInput>
    where?: MetaRecordWhereInput
  }

  export type MetaRecordUpdateToOneWithWhereWithoutParentInput = {
    where?: MetaRecordWhereInput
    data: XOR<MetaRecordUpdateWithoutParentInput, MetaRecordUncheckedUpdateWithoutParentInput>
  }

  export type MetaRecordUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entity?: MetaEntityUpdateOneWithoutRecordsNestedInput
    value?: MetaValueUpdateManyWithoutParentNestedInput
  }

  export type MetaRecordUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: MetaValueUncheckedUpdateManyWithoutParentNestedInput
  }

  export type MetaAttributeCreateManyRelationInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    entityId?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaRecordCreateManyEntityInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaAttributeCreateManyEntityInput = {
    id?: string
    title?: string | null
    name: string
    description?: string | null
    multiple?: boolean | null
    type?: string | null
    required?: boolean | null
    readonly?: boolean | null
    order?: number | null
    disable?: boolean | null
    hash?: string | null
    default?: string | null
    role?: number | null
    security?: boolean | null
    field?: string | null
    relationId?: string | null
    relationName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaAttributeUpdateWithoutRelationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    values?: MetaValueUpdateManyWithoutAttributeNestedInput
    entity?: MetaEntityUpdateOneWithoutChildrenNestedInput
  }

  export type MetaAttributeUncheckedUpdateWithoutRelationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    values?: MetaValueUncheckedUpdateManyWithoutAttributeNestedInput
  }

  export type MetaAttributeUncheckedUpdateManyWithoutRelationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaRecordUpdateWithoutEntityInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: MetaRecordRelationUpdateManyWithoutRecordNestedInput
    value?: MetaValueUpdateManyWithoutParentNestedInput
  }

  export type MetaRecordUncheckedUpdateWithoutEntityInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: MetaRecordRelationUncheckedUpdateManyWithoutRecordNestedInput
    value?: MetaValueUncheckedUpdateManyWithoutParentNestedInput
  }

  export type MetaRecordUncheckedUpdateManyWithoutEntityInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaAttributeUpdateWithoutEntityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    values?: MetaValueUpdateManyWithoutAttributeNestedInput
    relation?: MetaEntityUpdateOneWithoutRelationsNestedInput
  }

  export type MetaAttributeUncheckedUpdateWithoutEntityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    relationId?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    values?: MetaValueUncheckedUpdateManyWithoutAttributeNestedInput
  }

  export type MetaAttributeUncheckedUpdateManyWithoutEntityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    multiple?: NullableBoolFieldUpdateOperationsInput | boolean | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    required?: NullableBoolFieldUpdateOperationsInput | boolean | null
    readonly?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    disable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    default?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableIntFieldUpdateOperationsInput | number | null
    security?: NullableBoolFieldUpdateOperationsInput | boolean | null
    field?: NullableStringFieldUpdateOperationsInput | string | null
    relationId?: NullableStringFieldUpdateOperationsInput | string | null
    relationName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaValueCreateManyAttributeInput = {
    parentId: string
    name: string
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaValueUpdateWithoutAttributeInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: MetaRecordUpdateOneRequiredWithoutValueNestedInput
    children?: MetaRecordRelationUpdateManyWithoutValueNestedInput
  }

  export type MetaValueUncheckedUpdateWithoutAttributeInput = {
    parentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: MetaRecordRelationUncheckedUpdateManyWithoutValueNestedInput
  }

  export type MetaValueUncheckedUpdateManyWithoutAttributeInput = {
    parentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaRecordRelationCreateManyRecordInput = {
    valueParentId: string
    valueName: string
  }

  export type MetaValueCreateManyParentInput = {
    name: string
    attributeId?: string | null
    type?: number
    childrenProperty?: string | null
    order?: number | null
    bit?: number | null
    tinyint?: number | null
    smallint?: number | null
    int?: number | null
    bigint?: bigint | number | null
    float?: number | null
    date?: Date | string | null
    time?: Date | string | null
    datetime?: Date | string | null
    varchar?: string | null
    text?: string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: Bytes | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MetaRecordRelationUpdateWithoutRecordInput = {
    value?: MetaValueUpdateOneRequiredWithoutChildrenNestedInput
  }

  export type MetaRecordRelationUncheckedUpdateWithoutRecordInput = {
    valueParentId?: StringFieldUpdateOperationsInput | string
    valueName?: StringFieldUpdateOperationsInput | string
  }

  export type MetaRecordRelationUncheckedUpdateManyWithoutRecordInput = {
    valueParentId?: StringFieldUpdateOperationsInput | string
    valueName?: StringFieldUpdateOperationsInput | string
  }

  export type MetaValueUpdateWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: MetaAttributeUpdateOneWithoutValuesNestedInput
    children?: MetaRecordRelationUpdateManyWithoutValueNestedInput
  }

  export type MetaValueUncheckedUpdateWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    attributeId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: MetaRecordRelationUncheckedUpdateManyWithoutValueNestedInput
  }

  export type MetaValueUncheckedUpdateManyWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    attributeId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: IntFieldUpdateOperationsInput | number
    childrenProperty?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    bit?: NullableIntFieldUpdateOperationsInput | number | null
    tinyint?: NullableIntFieldUpdateOperationsInput | number | null
    smallint?: NullableIntFieldUpdateOperationsInput | number | null
    int?: NullableIntFieldUpdateOperationsInput | number | null
    bigint?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    float?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    varchar?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    json?: NullableJsonNullValueInput | InputJsonValue
    blob?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetaRecordRelationCreateManyValueInput = {
    recordId: string
  }

  export type MetaRecordRelationUpdateWithoutValueInput = {
    record?: MetaRecordUpdateOneRequiredWithoutParentNestedInput
  }

  export type MetaRecordRelationUncheckedUpdateWithoutValueInput = {
    recordId?: StringFieldUpdateOperationsInput | string
  }

  export type MetaRecordRelationUncheckedUpdateManyWithoutValueInput = {
    recordId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}