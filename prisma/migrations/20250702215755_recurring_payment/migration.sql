-- CreateTable
CREATE TABLE "RecurringPayment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalValue" REAL,
    "numberOfInstallments" INTEGER,
    "automaticPayment" BOOLEAN NOT NULL,
    "singlePaymentValue" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dayOfMonth" INTEGER NOT NULL,
    CONSTRAINT "RecurringPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "observation" TEXT,
    "status" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "recurringPaymentId" INTEGER,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_recurringPaymentId_fkey" FOREIGN KEY ("recurringPaymentId") REFERENCES "RecurringPayment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("categoryId", "createdAt", "description", "id", "observation", "paymentDate", "paymentMethod", "status", "updatedAt", "userId", "value") SELECT "categoryId", "createdAt", "description", "id", "observation", "paymentDate", "paymentMethod", "status", "updatedAt", "userId", "value" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
