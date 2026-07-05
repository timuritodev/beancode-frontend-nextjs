/**
 * ru-email-domain — проверка домена email на «российскость».
 *
 * Перенос ядра из beancode-trading. Нулевая зависимость, без привязки к
 * фреймворку. Политика по умолчанию (белый список): адрес разрешён, если домен
 * в зоне .ru / .su / .рф ИЛИ явно добавлен в `allowedDomains`. Пропускает и
 * публичные RU-сервисы (yandex.ru, mail.ru…), и корпоративную почту на .ru.
 */

/** Российские доменные зоны верхнего уровня. `xn--p1ai` — punycode для «рф». */
export const RU_TLDS: readonly string[] = ['ru', 'su', 'рф', 'xn--p1ai'];

/** Известные российские провайдеры — справочно и как seed для allowedDomains. */
export const RU_EMAIL_PROVIDERS: readonly string[] = [
  'yandex.ru',
  'ya.ru',
  'narod.ru',
  'mail.ru',
  'bk.ru',
  'inbox.ru',
  'list.ru',
  'internet.ru',
  'rambler.ru',
  'lenta.ru',
  'autorambler.ru',
  'myrambler.ru',
  'ro.ru',
];

/** Текст ошибки по умолчанию (готов к показу пользователю). */
export const RU_EMAIL_ERROR_MESSAGE =
  'Разрешена только почта в российских доменах (.ru, .su, .рф). ' +
  'Укажите адрес на yandex.ru, mail.ru или на корпоративном .ru-домене.';

export interface RuEmailPolicy {
  allowedTlds?: readonly string[];
  allowedDomains?: readonly string[];
  blockedDomains?: readonly string[];
}

export type RuEmailCheckResult =
  | { ok: true; domain: string }
  | { ok: false; reason: 'invalid_format' | 'blocked_domain' | 'foreign_domain'; domain: string | null };

const EMAIL_RE = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;

/** Возвращает домен email в нижнем регистре или null, если адрес некорректен. */
export function extractEmailDomain(email: unknown): string | null {
  if (typeof email !== 'string') return null;
  const match = EMAIL_RE.exec(email.trim().toLowerCase());
  return match ? match[1] : null;
}

function domainMatches(domain: string, entry: string): boolean {
  const e = entry.trim().toLowerCase();
  return domain === e || domain.endsWith('.' + e);
}

function getTld(domain: string): string {
  const idx = domain.lastIndexOf('.');
  return idx === -1 ? domain : domain.slice(idx + 1);
}

/** Проверяет email по политике белого списка. Не бросает исключений. */
export function checkRuEmailDomain(
  email: unknown,
  policy: RuEmailPolicy = {},
): RuEmailCheckResult {
  const domain = extractEmailDomain(email);
  if (!domain) return { ok: false, reason: 'invalid_format', domain: null };

  const allowedTlds = policy.allowedTlds ?? RU_TLDS;
  const allowedDomains = policy.allowedDomains ?? [];
  const blockedDomains = policy.blockedDomains ?? [];

  if (blockedDomains.some((d) => domainMatches(domain, d))) {
    return { ok: false, reason: 'blocked_domain', domain };
  }

  const tld = getTld(domain);
  const tldAllowed = allowedTlds.some((t) => t.trim().toLowerCase() === tld);
  const domainAllowed = allowedDomains.some((d) => domainMatches(domain, d));

  if (tldAllowed || domainAllowed) return { ok: true, domain };
  return { ok: false, reason: 'foreign_domain', domain };
}

/** Короткая булева обёртка над checkRuEmailDomain. */
export function isRuEmailDomain(email: unknown, policy?: RuEmailPolicy): boolean {
  return checkRuEmailDomain(email, policy).ok;
}
