-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar TEXT,
  google_id TEXT UNIQUE,
  subscription_tier TEXT DEFAULT 'free', -- 'free', 'pro'
  subscription_expires_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- 使用次数记录表（用于限流）
CREATE TABLE IF NOT EXISTS usage_records (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  ip_address TEXT,
  date TEXT NOT NULL, -- YYYY-MM-DD
  count INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  UNIQUE(user_id, date),
  UNIQUE(ip_address, date)
);

-- 生成历史表
CREATE TABLE IF NOT EXISTS name_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  original_name TEXT,
  gender TEXT,
  birthday TEXT,
  generated_names TEXT NOT NULL, -- JSON 格式
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 收藏表
CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  chinese_name TEXT NOT NULL,
  pinyin TEXT,
  meaning TEXT,
  style TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_usage_records_user_date ON usage_records(user_id, date);
CREATE INDEX IF NOT EXISTS idx_usage_records_ip_date ON usage_records(ip_address, date);
CREATE INDEX IF NOT EXISTS idx_name_history_user ON name_history(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id, created_at DESC);
