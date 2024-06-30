// 短縮URLとリダイレクト先の対応表
// 短縮URL: [短縮URL, リダイレクト先URL]
// リダイレクト先URLがパスの場合はmisskey-hub.netにリダイレクト
export const redirectSource: [string, string][] = [
    // 寄付
    ['donate', '/docs/donate/'],

    // ソーシャルアカウント
    ['discord', 'https://discord.com/invite/Wp8gVStHW3'],
    ['mi-crowdin', 'https://crowdin.com/project/misskey'],
    ['hub-crowdin', 'https://crowdin.com/project/misskey-hub'],

    // リリースノート
    ['changelog', '/docs/releases/'],
    ['releases', '/docs/releases/'],

    // よく使われるガイド集
    ['about', '/docs/about-misskey/'],
    ['warning', '/docs/for-users/onboarding/warning/'],
    ['2fa', '/docs/for-users/stepped-guides/how-to-enable-2fa/'],
    ['pwa', '/docs/for-users/stepped-guides/how-to-use-pwa/'],
];
