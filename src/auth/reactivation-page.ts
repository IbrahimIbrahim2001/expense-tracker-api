export const renderReactivationPage = (success: boolean, message: string, appLink: string) => {
    const status = success ? "Success!" : "Failed";
    const color = success ? "#16a34a" : "#dc2626";
    const button = success
        ? '<a href="' + appLink + '" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Open App</a>'
        : "";

    return '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
        '    <title>Account Reactivation</title>\n' +
        '</head>\n' +
        '<body style="font-family: -apple-system, sans-serif; text-align: center; padding: 60px 20px; background: #f5f5f5;">\n' +
        '    <div style="max-width: 400px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">\n' +
        '        <h2 style="margin: 0 0 12px; color: ' + color + ';">' + status + '</h2>\n' +
        '        <p style="color: #666; margin: 0 0 24px;">' + message + '</p>\n' +
        '        ' + button + '\n' +
        '    </div>\n' +
        '</body>\n' +
        '</html>';
};
