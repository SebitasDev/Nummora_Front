import { forMember, mapFrom } from '@automapper/core';

export const bigintToString = <TSource, TDestination>(
    key: keyof TSource,
    destSelector: (dest: TDestination) => string
) =>
    forMember(
        destSelector,
        mapFrom((src: TSource) => (src[key] as unknown as bigint)?.toString())
    );