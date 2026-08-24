import type { MessageKeys, Messages, NamespaceKeys, NestedKeyOf, NestedValueOf } from "next-intl";

export type TranslationKeys<Namespace extends NamespaceKeys<Messages, NestedKeyOf<Messages>>> = MessageKeys<
  NestedValueOf<Messages, Namespace>,
  NestedKeyOf<NestedValueOf<Messages, Namespace>>
>;
