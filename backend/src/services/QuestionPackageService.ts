import { QuestionPackageModel , QuestionPackage} from '../models/question-package.model'; // Şemanın bulunduğu yer

class QuestionPackageService {
    // Soru paketi oluşturma
    async createQuestionPackage(title: string): Promise<QuestionPackage> {
        const newPackage = new QuestionPackageModel({
            title,
            questionCount: 0, // Başlangıçta 0
            questions: [],
        });
        return await newPackage.save();
    }

    // Soru ekleme
    async addQuestion(packageId: string, question: string, time: number): Promise<QuestionPackage | null> {
        const questionPackage = await QuestionPackageModel.findById(packageId);
        if (!questionPackage) {
            throw new Error('Question package not found');
        }

        // Yeni soruyu ekle
        questionPackage.questions.push({ question, time });
        questionPackage.questionCount = questionPackage.questions.length; // Soru sayısını güncelle

        return await questionPackage.save();
    }

    // Tüm soru paketlerini listeleme
    async getAllPackages(): Promise<QuestionPackage[]> {
        return await QuestionPackageModel.find();
    }

    // Tek bir soru paketini getirme
    async getPackageById(packageId: string): Promise<QuestionPackage | null> {
        return await QuestionPackageModel.findById(packageId);
    }
}

export const questionPackageService = new QuestionPackageService();
