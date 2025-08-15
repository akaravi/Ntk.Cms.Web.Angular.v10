const fs = require("fs");
const path = require("path");

// Function to translate placeholder keys
function translatePlaceholders() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  console.log("🔧 Translating placeholder keys...\n");

  // Define translations for common placeholder keys
  const translations = {
    "ACTION.GET_BALANCE": {
      en: "Get Balance",
      ar: "الحصول على الرصيد",
      de: "Guthaben abrufen",
      es: "Obtener saldo",
      fr: "Obtenir le solde",
      ja: "残高を取得",
      tr: "Bakiye al",
      zh: "获取余额",
    },
    "TITLE.subjectTitle": {
      en: "Subject Title",
      ar: "عنوان الموضوع",
      de: "Betrefftitel",
      es: "Título del asunto",
      fr: "Titre du sujet",
      ja: "件名タイトル",
      tr: "Konu başlığı",
      zh: "主题标题",
    },
    "TITLE.subjectBody": {
      en: "Subject Body",
      ar: "محتوى الموضوع",
      de: "Betreffinhalt",
      es: "Cuerpo del asunto",
      fr: "Corps du sujet",
      ja: "件名本文",
      tr: "Konu gövdesi",
      zh: "主题内容",
    },
    "TITLE.createdBy": {
      en: "Created By",
      ar: "أنشئ بواسطة",
      de: "Erstellt von",
      es: "Creado por",
      fr: "Créé par",
      ja: "作成者",
      tr: "Oluşturan",
      zh: "创建者",
    },
    "TITLE.createdDate": {
      en: "Created Date",
      ar: "تاريخ الإنشاء",
      de: "Erstellungsdatum",
      es: "Fecha de creación",
      fr: "Date de création",
      ja: "作成日",
      tr: "Oluşturma tarihi",
      zh: "创建日期",
    },
    "TITLE.writer": {
      en: "Writer",
      ar: "كاتب",
      de: "Autor",
      es: "Escritor",
      fr: "Écrivain",
      ja: "著者",
      tr: "Yazar",
      zh: "作者",
    },
    "ACTION.Permission": {
      en: "Permission",
      ar: "إذن",
      de: "Berechtigung",
      es: "Permiso",
      fr: "Permission",
      ja: "権限",
      tr: "İzin",
      zh: "权限",
    },
    "TITLE.Selected_Api_Number": {
      en: "Selected API Number",
      ar: "رقم API المحدد",
      de: "Ausgewählte API-Nummer",
      es: "Número de API seleccionado",
      fr: "Numéro d'API sélectionné",
      ja: "選択されたAPI番号",
      tr: "Seçilen API numarası",
      zh: "选定的API编号",
    },
    "AUTH.FORGOT.EMAIL_IS_CORRECT": {
      en: "Email is correct",
      ar: "البريد الإلكتروني صحيح",
      de: "E-Mail ist korrekt",
      es: "El correo electrónico es correcto",
      fr: "L'e-mail est correct",
      ja: "メールアドレスは正しいです",
      tr: "E-posta doğru",
      zh: "邮箱正确",
    },
    "ERRORMESSAGE.TITLE.typeErrorSetStatus": {
      en: "Error",
      ar: "خطأ",
      de: "Fehler",
      es: "Error",
      fr: "Erreur",
      ja: "エラー",
      tr: "Hata",
      zh: "错误",
    },
    "ERRORMESSAGE.TITLE.typeSuccessSetStatus": {
      en: "Success",
      ar: "نجح",
      de: "Erfolg",
      es: "Éxito",
      fr: "Succès",
      ja: "成功",
      tr: "Başarı",
      zh: "成功",
    },
    "MESSAGE.get_billboards_information": {
      en: "Get billboards information",
      ar: "الحصول على معلومات اللوحات الإعلانية",
      de: "Informationen zu Werbetafeln abrufen",
      es: "Obtener información de vallas publicitarias",
      fr: "Obtenir les informations des panneaux d'affichage",
      ja: "看板情報を取得",
      tr: "Billboard bilgilerini al",
      zh: "获取广告牌信息",
    },
    "MESSAGE.customer_order_needs_approval": {
      en: "Customer order needs approval",
      ar: "طلب العميل يحتاج إلى موافقة",
      de: "Kundenauftrag benötigt Genehmigung",
      es: "El pedido del cliente necesita aprobación",
      fr: "La commande du client nécessite une approbation",
      ja: "顧客注文は承認が必要です",
      tr: "Müşteri siparişi onay gerektiriyor",
      zh: "客户订单需要审批",
    },
    "MESSAGE.content_not_selected": {
      en: "Content not selected",
      ar: "المحتوى غير محدد",
      de: "Inhalt nicht ausgewählt",
      es: "Contenido no seleccionado",
      fr: "Contenu non sélectionné",
      ja: "コンテンツが選択されていません",
      tr: "İçerik seçilmedi",
      zh: "内容未选择",
    },
    "TITLE.QUICK_ADD": {
      en: "Quick Add",
      ar: "إضافة سريعة",
      de: "Schnell hinzufügen",
      es: "Agregar rápidamente",
      fr: "Ajout rapide",
      ja: "クイック追加",
      tr: "Hızlı ekle",
      zh: "快速添加",
    },
    "TITLE.ResponsibleUsers": {
      en: "Responsible Users",
      ar: "المستخدمون المسؤولون",
      de: "Verantwortliche Benutzer",
      es: "Usuarios responsables",
      fr: "Utilisateurs responsables",
      ja: "責任者",
      tr: "Sorumlu kullanıcılar",
      zh: "负责用户",
    },
    "TITLE.Video_File_ID_Fa": {
      en: "Video File ID (Persian)",
      ar: "معرف ملف الفيديو (الفارسية)",
      de: "Video-Datei-ID (Persisch)",
      es: "ID de archivo de video (Persa)",
      fr: "ID de fichier vidéo (Persan)",
      ja: "動画ファイルID（ペルシャ語）",
      tr: "Video dosya ID'si (Farsça)",
      zh: "视频文件ID（波斯语）",
    },
    "TITLE.Audio_File_ID_Fa": {
      en: "Audio File ID (Persian)",
      ar: "معرف ملف الصوت (الفارسية)",
      de: "Audio-Datei-ID (Persisch)",
      es: "ID de archivo de audio (Persa)",
      fr: "ID de fichier audio (Persan)",
      ja: "音声ファイルID（ペルシャ語）",
      tr: "Ses dosyası ID'si (Farsça)",
      zh: "音频文件ID（波斯语）",
    },
    "TITLE.Video_File_ID_En": {
      en: "Video File ID (English)",
      ar: "معرف ملف الفيديو (الإنجليزية)",
      de: "Video-Datei-ID (Englisch)",
      es: "ID de archivo de video (Inglés)",
      fr: "ID de fichier vidéo (Anglais)",
      ja: "動画ファイルID（英語）",
      tr: "Video dosya ID'si (İngilizce)",
      zh: "视频文件ID（英语）",
    },
    "TITLE.Audio_File_ID_En": {
      en: "Audio File ID (English)",
      ar: "معرف ملف الصوت (الإنجليزية)",
      de: "Audio-Datei-ID (Englisch)",
      es: "ID de archivo de audio (Inglés)",
      fr: "ID de fichier audio (Anglais)",
      ja: "音声ファイルID（英語）",
      tr: "Ses dosyası ID'si (İngilizce)",
      zh: "音频文件ID（英语）",
    },
    "TITLE.Video_File_ID_Ar": {
      en: "Video File ID (Arabic)",
      ar: "معرف ملف الفيديو (العربية)",
      de: "Video-Datei-ID (Arabisch)",
      es: "ID de archivo de video (Árabe)",
      fr: "ID de fichier vidéo (Arabe)",
      ja: "動画ファイルID（アラビア語）",
      tr: "Video dosya ID'si (Arapça)",
      zh: "视频文件ID（阿拉伯语）",
    },
    "TITLE.Audio_File_ID_Ar": {
      en: "Audio File ID (Arabic)",
      ar: "معرف ملف الصوت (العربية)",
      de: "Audio-Datei-ID (Arabisch)",
      es: "ID de archivo de audio (Árabe)",
      fr: "ID de fichier audio (Arabe)",
      ja: "音声ファイルID（アラビア語）",
      tr: "Ses dosyası ID'si (Arapça)",
      zh: "音频文件ID（阿拉伯语）",
    },
    "TITLE.Video_File_ID_De": {
      en: "Video File ID (German)",
      ar: "معرف ملف الفيديو (الألمانية)",
      de: "Video-Datei-ID (Deutsch)",
      es: "ID de archivo de video (Alemán)",
      fr: "ID de fichier vidéo (Allemand)",
      ja: "動画ファイルID（ドイツ語）",
      tr: "Video dosya ID'si (Almanca)",
      zh: "视频文件ID（德语）",
    },
    "TITLE.Audio_File_ID_De": {
      en: "Audio File ID (German)",
      ar: "معرف ملف الصوت (الألمانية)",
      de: "Audio-Datei-ID (Deutsch)",
      es: "ID de archivo de audio (Alemán)",
      fr: "ID de fichier audio (Allemand)",
      ja: "音声ファイルID（ドイツ語）",
      tr: "Ses dosyası ID'si (Almanca)",
      zh: "音频文件ID（德语）",
    },
    "TITLE.PROPERTY.ADD": {
      en: "Add Property",
      ar: "إضافة عقار",
      de: "Eigenschaft hinzufügen",
      es: "Agregar propiedad",
      fr: "Ajouter une propriété",
      ja: "プロパティを追加",
      tr: "Özellik ekle",
      zh: "添加属性",
    },
    "TITLE.In_This_Section_You_Can_Edit_The_Content_Of_Your_Guide": {
      en: "In this section you can edit the content of your guide",
      ar: "في هذا القسم يمكنك تحرير محتوى دليلك",
      de: "In diesem Abschnitt können Sie den Inhalt Ihres Leitfadens bearbeiten",
      es: "En esta sección puedes editar el contenido de tu guía",
      fr: "Dans cette section, vous pouvez modifier le contenu de votre guide",
      ja: "このセクションでは、ガイドの内容を編集できます",
      tr: "Bu bölümde rehberinizin içeriğini düzenleyebilirsiniz",
      zh: "在此部分，您可以编辑指南的内容",
    },
    "TITLE.Select_a_domain_from_the_list_of_available_domains_and_select_a_Latin_title_to_match_your_system_name_for_addressing":
      {
        en: "Select a domain from the list of available domains and select a Latin title to match your system name for addressing",
        ar: "اختر نطاقًا من قائمة النطاقات المتاحة واختر عنوانًا لاتينيًا ليتطابق مع اسم نظامك للعنونة",
        de: "Wählen Sie eine Domain aus der Liste der verfügbaren Domains und wählen Sie einen lateinischen Titel, der zu Ihrem Systemnamen für die Adressierung passt",
        es: "Seleccione un dominio de la lista de dominios disponibles y seleccione un título latino para que coincida con el nombre de su sistema para el direccionamiento",
        fr: "Sélectionnez un domaine dans la liste des domaines disponibles et sélectionnez un titre latin pour correspondre au nom de votre système pour l'adressage",
        ja: "利用可能なドメインのリストからドメインを選択し、アドレッシング用のシステム名に一致するラテンタイトルを選択してください",
        tr: "Kullanılabilir alan adları listesinden bir alan adı seçin ve adresleme için sistem adınızla eşleşecek bir Latin başlığı seçin",
        zh: "从可用域名列表中选择一个域名，并选择一个拉丁标题以匹配您的系统名称进行寻址",
      },
    "TITLE.Management_note_of_the_whole_system": {
      en: "Management note of the whole system",
      ar: "ملاحظة إدارة النظام بأكمله",
      de: "Management-Hinweis des gesamten Systems",
      es: "Nota de gestión de todo el sistema",
      fr: "Note de gestion de l'ensemble du système",
      ja: "システム全体の管理メモ",
      tr: "Tüm sistemin yönetim notu",
      zh: "整个系统的管理说明",
    },
    "TITLE.Delivery_end_date": {
      en: "Delivery end date",
      ar: "تاريخ انتهاء التسليم",
      de: "Lieferenddatum",
      es: "Fecha de finalización de entrega",
      fr: "Date de fin de livraison",
      ja: "配達終了日",
      tr: "Teslimat bitiş tarihi",
      zh: "交付结束日期",
    },
    "TITLE.Note_the_tracking_code_for_further_tracking": {
      en: "Note the tracking code for further tracking",
      ar: "لاحظ رمز التتبع لمزيد من التتبع",
      de: "Notieren Sie den Tracking-Code für weitere Verfolgung",
      es: "Anote el código de seguimiento para un seguimiento posterior",
      fr: "Notez le code de suivi pour un suivi ultérieur",
      ja: "今後の追跡のために追跡コードを記録してください",
      tr: "Daha fazla takip için takip kodunu not edin",
      zh: "记录跟踪代码以便进一步跟踪",
    },
    "TITLE.imore": {
      en: "More",
      ar: "أكثر",
      de: "Mehr",
      es: "Más",
      fr: "Plus",
      ja: "もっと",
      tr: "Daha fazla",
      zh: "更多",
    },
    "TITLE.Create": {
      en: "Create",
      ar: "إنشاء",
      de: "Erstellen",
      es: "Crear",
      fr: "Créer",
      ja: "作成",
      tr: "Oluştur",
      zh: "创建",
    },
    "TITLE.Access_Add_Row": {
      en: "Access to add row",
      ar: "الوصول لإضافة صف",
      de: "Zugriff zum Hinzufügen einer Zeile",
      es: "Acceso para agregar fila",
      fr: "Accès pour ajouter une ligne",
      ja: "行を追加するアクセス",
      tr: "Satır ekleme erişimi",
      zh: "添加行的访问权限",
    },
    "TITLE.Contract_ARCHIEVE": {
      en: "Contract archive days",
      ar: "أيام أرشيف العقد",
      de: "Vertragsarchiv-Tage",
      es: "Días de archivo del contrato",
      fr: "Jours d'archivage du contrat",
      ja: "契約アーカイブ日数",
      tr: "Sözleşme arşiv günleri",
      zh: "合同存档天数",
    },
    "TITLE.Memo": {
      en: "Memo",
      ar: "مذكرة",
      de: "Notiz",
      es: "Memo",
      fr: "Mémo",
      ja: "メモ",
      tr: "Not",
      zh: "备忘录",
    },
    "ROUTE.ARTICLE": {
      en: "Article",
      ar: "مقالة",
      de: "Artikel",
      es: "Artículo",
      fr: "Article",
      ja: "記事",
      tr: "Makale",
      zh: "文章",
    },
    "ROUTE.LINKMANAGMENT.MEMBER": {
      en: "Member",
      ar: "عضو",
      de: "Mitglied",
      es: "Miembro",
      fr: "Membre",
      ja: "メンバー",
      tr: "Üye",
      zh: "成员",
    },
    "ngx-ntk-cron-editor": {
      en: "Cron Editor",
      ar: "محرر Cron",
      de: "Cron-Editor",
      es: "Editor de Cron",
      fr: "Éditeur Cron",
      ja: "Cronエディター",
      tr: "Cron Editörü",
      zh: "Cron编辑器",
    },
  };

  files.forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const lang = file.replace(".json", "");
    let translated = false;

    // Find and translate placeholder keys
    Object.keys(content).forEach((key) => {
      if (
        content[key] &&
        typeof content[key] === "string" &&
        content[key].startsWith("[") &&
        content[key].includes("]")
      ) {
        // Extract the original text (remove [LANG] prefix)
        const originalText = content[key].replace(/^\[[A-Z]+\]\s*/, "");

        // Check if we have a translation for this key
        if (translations[key] && translations[key][lang]) {
          content[key] = translations[key][lang];
          translated = true;
          console.log(`✅ Translated: ${key} in ${file}`);
        } else {
          // If no specific translation, use a generic approach
          const genericTranslations = {
            en: originalText,
            ar: `[${lang.toUpperCase()}] ${originalText}`,
            de: `[${lang.toUpperCase()}] ${originalText}`,
            es: `[${lang.toUpperCase()}] ${originalText}`,
            fr: `[${lang.toUpperCase()}] ${originalText}`,
            ja: `[${lang.toUpperCase()}] ${originalText}`,
            tr: `[${lang.toUpperCase()}] ${originalText}`,
            zh: `[${lang.toUpperCase()}] ${originalText}`,
          };

          if (genericTranslations[lang]) {
            content[key] = genericTranslations[lang];
            translated = true;
            console.log(`⚠️  Generic translation: ${key} in ${file}`);
          }
        }
      }
    });

    if (translated) {
      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf8");
      console.log(`💾 Updated: ${file}\n`);
    }
  });
}

// Function to check remaining placeholders
function checkRemainingPlaceholders() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  console.log("\n🔍 Checking remaining placeholders...\n");

  files.forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const placeholderKeys = Object.keys(content).filter(
      (key) =>
        content[key] &&
        typeof content[key] === "string" &&
        content[key].startsWith("[") &&
        content[key].includes("]"),
    );

    if (placeholderKeys.length > 0) {
      console.log(
        `📁 ${file}: ${placeholderKeys.length} placeholders remaining`,
      );
      placeholderKeys.forEach((key) => {
        console.log(`   ⚠️  ${key}: ${content[key]}`);
      });
      console.log("");
    } else {
      console.log(`✅ ${file}: No placeholders remaining`);
    }
  });
}

// Main execution
try {
  translatePlaceholders();
  checkRemainingPlaceholders();

  console.log("🎉 Placeholder translation completed!");
  console.log("\n📋 Next steps:");
  console.log("1. Review any remaining placeholders");
  console.log("2. Manually translate any keys that need specific attention");
  console.log("3. Run final-translation-check.js to verify");
} catch (error) {
  console.error("❌ Error during placeholder translation:", error.message);
}
