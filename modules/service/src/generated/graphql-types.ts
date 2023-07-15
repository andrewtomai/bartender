import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `UUID` scalar type represents UUID values as specified by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  room?: Maybe<Room>;
  user?: Maybe<User>;
  occupant?: Maybe<Occupant>;
  drink?: Maybe<Drink>;
  listDrinks: Array<Maybe<Drink>>;
};


export type QueryRoomArgs = {
  roomId: Scalars['UUID'];
};


export type QueryUserArgs = {
  userId: Scalars['UUID'];
};


export type QueryOccupantArgs = {
  occupant: OccupantInput;
};


export type QueryDrinkArgs = {
  id: Scalars['UUID'];
};


export type QueryListDrinksArgs = {
  query: DrinkQuery;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createRoom: Room;
  deleteRoom?: Maybe<Room>;
  createUser: User;
  joinRoom?: Maybe<Occupant>;
  leaveRoom?: Maybe<Occupant>;
  updatePreferences?: Maybe<Occupant>;
  createDrink: Drink;
};


export type MutationCreateRoomArgs = {
  input: RoomInput;
};


export type MutationDeleteRoomArgs = {
  id: Scalars['UUID'];
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationJoinRoomArgs = {
  occupant: OccupantInput;
};


export type MutationLeaveRoomArgs = {
  occupant: OccupantInput;
};


export type MutationUpdatePreferencesArgs = {
  occupantId: Scalars['UUID'];
  preferences: Array<Maybe<DrinkPreferenceInput>>;
};


export type MutationCreateDrinkArgs = {
  drink: DrinkInput;
};

export type RoomInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['UUID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  occupants: Array<Maybe<Occupant>>;
  menu: Array<Maybe<Drink>>;
  ingrediants: Array<Maybe<QuantifiedIngrediant>>;
  createdAt: Scalars['String'];
  createdBy: User;
};

export type OccupantInput = {
  userId: Scalars['UUID'];
  roomId: Scalars['UUID'];
};

export type UserInput = {
  name: Scalars['String'];
};

export type DrinkPreferenceInput = {
  id: Scalars['UUID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['UUID'];
  occupancies: Array<Maybe<Occupant>>;
  name: Scalars['String'];
};

export type Occupant = {
  __typename?: 'Occupant';
  room: Room;
  user: User;
  prefereces: Array<Maybe<Drink>>;
};

export type DrinkQuery = {
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type DrinkInput = {
  name: Scalars['String'];
  recipe?: Maybe<Array<QuantifiedIngrediantInput>>;
  tags?: Maybe<Array<Scalars['UUID']>>;
};

export type QuantifiedIngrediantInput = {
  name: Scalars['String'];
  quantity: Scalars['String'];
};

export type Drink = {
  __typename?: 'Drink';
  id: Scalars['UUID'];
  name: Scalars['String'];
  recipe?: Maybe<Array<QuantifiedIngrediant>>;
  tags?: Maybe<Array<Drink>>;
};

export type Ingrediant = {
  __typename?: 'Ingrediant';
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type QuantifiedIngrediant = {
  __typename?: 'QuantifiedIngrediant';
  id: Scalars['UUID'];
  name: Scalars['String'];
  quantity: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  RoomInput: RoomInput;
  Room: ResolverTypeWrapper<Room>;
  OccupantInput: OccupantInput;
  UserInput: UserInput;
  DrinkPreferenceInput: DrinkPreferenceInput;
  User: ResolverTypeWrapper<User>;
  Occupant: ResolverTypeWrapper<Occupant>;
  DrinkQuery: DrinkQuery;
  DrinkInput: DrinkInput;
  QuantifiedIngrediantInput: QuantifiedIngrediantInput;
  Drink: ResolverTypeWrapper<Drink>;
  Ingrediant: ResolverTypeWrapper<Ingrediant>;
  QuantifiedIngrediant: ResolverTypeWrapper<QuantifiedIngrediant>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  UUID: Scalars['UUID'];
  Query: {};
  String: Scalars['String'];
  Mutation: {};
  RoomInput: RoomInput;
  Room: Room;
  OccupantInput: OccupantInput;
  UserInput: UserInput;
  DrinkPreferenceInput: DrinkPreferenceInput;
  User: User;
  Occupant: Occupant;
  DrinkQuery: DrinkQuery;
  DrinkInput: DrinkInput;
  QuantifiedIngrediantInput: QuantifiedIngrediantInput;
  Drink: Drink;
  Ingrediant: Ingrediant;
  QuantifiedIngrediant: QuantifiedIngrediant;
  Upload: Scalars['Upload'];
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryRoomArgs, 'roomId'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  occupant?: Resolver<Maybe<ResolversTypes['Occupant']>, ParentType, ContextType, RequireFields<QueryOccupantArgs, 'occupant'>>;
  drink?: Resolver<Maybe<ResolversTypes['Drink']>, ParentType, ContextType, RequireFields<QueryDrinkArgs, 'id'>>;
  listDrinks?: Resolver<Array<Maybe<ResolversTypes['Drink']>>, ParentType, ContextType, RequireFields<QueryListDrinksArgs, 'query'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createRoom?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<MutationCreateRoomArgs, 'input'>>;
  deleteRoom?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<MutationDeleteRoomArgs, 'id'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  joinRoom?: Resolver<Maybe<ResolversTypes['Occupant']>, ParentType, ContextType, RequireFields<MutationJoinRoomArgs, 'occupant'>>;
  leaveRoom?: Resolver<Maybe<ResolversTypes['Occupant']>, ParentType, ContextType, RequireFields<MutationLeaveRoomArgs, 'occupant'>>;
  updatePreferences?: Resolver<Maybe<ResolversTypes['Occupant']>, ParentType, ContextType, RequireFields<MutationUpdatePreferencesArgs, 'occupantId' | 'preferences'>>;
  createDrink?: Resolver<ResolversTypes['Drink'], ParentType, ContextType, RequireFields<MutationCreateDrinkArgs, 'drink'>>;
};

export type RoomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  occupants?: Resolver<Array<Maybe<ResolversTypes['Occupant']>>, ParentType, ContextType>;
  menu?: Resolver<Array<Maybe<ResolversTypes['Drink']>>, ParentType, ContextType>;
  ingrediants?: Resolver<Array<Maybe<ResolversTypes['QuantifiedIngrediant']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  occupancies?: Resolver<Array<Maybe<ResolversTypes['Occupant']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OccupantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Occupant'] = ResolversParentTypes['Occupant']> = {
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  prefereces?: Resolver<Array<Maybe<ResolversTypes['Drink']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DrinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Drink'] = ResolversParentTypes['Drink']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipe?: Resolver<Maybe<Array<ResolversTypes['QuantifiedIngrediant']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Drink']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngrediantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ingrediant'] = ResolversParentTypes['Ingrediant']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantifiedIngrediantResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuantifiedIngrediant'] = ResolversParentTypes['QuantifiedIngrediant']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  UUID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Occupant?: OccupantResolvers<ContextType>;
  Drink?: DrinkResolvers<ContextType>;
  Ingrediant?: IngrediantResolvers<ContextType>;
  QuantifiedIngrediant?: QuantifiedIngrediantResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;